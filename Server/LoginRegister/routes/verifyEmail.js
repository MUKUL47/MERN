module.exports.verifyMail = (options)=>{
    return new Promise((resolve,reject)=>{
        require('nodemailer').createTransport({
            service: 'Gmail',
            auth: {
              user: "@gmail.com",
              pass: ""
            }
        })
        .sendMail(options, (error, info)=>{
               if(info) 
                   resolve("Sent") 
                else
                    reject("Invalid email") 
        })
    })
}
  