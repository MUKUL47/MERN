module.exports.welcome = (req,res)=>{    
    res.set("content-type","application/json")
    res.status(200)
    res.send({
        msg : "WELCOME"
    })
}

let setCookies = (res,email,id, time)=>{
        res.cookie('user', email)
        res.cookie('till',time )
        res.cookie('id',id )
}

function findEmail(email){ return db.find({email : email}) }

function sendMail(email, code){
               let mailOptions = {
                   from: 'mukudev404@gmail.com',
                   to: email,
                   subject: 'Your verification code (Expires in 5 minutes)',
                   html: `<h1>${code}</h1>`,
                   priority : "high"
                 };
    return require('./verifyEmail').verifyMail(mailOptions)
}

function findAndUpdateRegister(email, pass, res){
    let code = Math.floor(Math.random()*1000000),
        message = res.send({ Success : "Enter security code to activate account (expires in 5 minutes)", code : code, timeStamp : Date.now() })
    findEmail(email)
    .then(isThere => {
        if( isThere.length > 0 ) {            
            db.updateOne({email : email},
                    {password : sha256(pass), currentStatus : { token : code, expiresIn : Date.now(), isActive : false } })
            .then(() => sendMail(email,code))            
            .then(() => message)
            .catch(err => console.log(err))            
        }else{
            db.create({
                username : email.substring(0,email.indexOf('@')),
                password : sha256(pass),
                email : email,
                currentStatus : {
                    token : code,
                    expiresIn : Date.now(),
                    isActive : false
                }
            }).then(() => sendMail(email,code)).then(() => message)      
        }
    })
    
}

module.exports.getLastLogged = (req,res)=>{
    res.send({user : JSON.stringify(req.cookies)})
}

module.exports.Login = (req,res)=>{
    let email = req.body.email.toLowerCase(),
    pass = req.body.password,
    remember = req.body.rememberLogin
    if( pass.length === 0 ){ //when session not expired       
        findEmail(email).then(nL => {
                if(nL.length > 0){ res.status(200).send({ Success : nL }) }
                else{ res.status(401).send({ Error : "Incorrect password" })
                }})
    }else{//first time login
        findEmail(email).then(msg => {
        if(msg.length === 0){            
            res.status(404).send({ Error : "User not found" })            
        }
        else{            
            if( !msg[0].currentStatus.isActive ){
                res.status(401).send({ Error : "Account not updated : Update this account with new password"})                
            }
            else{
            db.find({email : email, password : sha256(pass)})
            .then(nL => {
                if(nL.length > 0){
                        if(remember){ setCookies(res,email,nL[0]._id, Infinity) }
                        else setCookies(res,email,nL[0]._id, Date.now())
                    res.status(200).send({ Success : nL })  
                }else{ 
                    res.status(401).send({ Error : "Incorrect password"
                 })
                }               
            })}}
    })}
}

module.exports.Register = (req,res)=>{
    res.set("content-type","application/json")
    let email = req.body.email.toLowerCase(),
    pass = req.body.password
    findEmail(email).then(msg => {
        if(msg.length === 1 && msg[0].currentStatus.isActive){
            res.status(401).send({ Error : "User already exist" })
        }
        else{
            findAndUpdateRegister(email,pass,res)         
        }
    }) 
}

module.exports.updateStatus = (req,res)=>{
    res.set("content-type","application/json")   
    let email = req.body.email.toLowerCase(),
        remember = req.body.remember
    db.update({email : email},{ currentStatus : { isActive : true } }).
    then(()=> { if(remember){ setCookies(req,res,email) }
        res.send({ Success : "Account status updated" })}
        )

}

module.exports.logout = (req,res)=>{
    res.clearCookie("user")
    res.clearCookie("till")    
    res.clearCookie("id")
    res.send({ Success : "Logged out"})
}
