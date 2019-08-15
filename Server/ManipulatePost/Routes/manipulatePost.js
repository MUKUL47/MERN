module.exports.deleteKeyword = (req,res) => {
    
     db.update
        ({  "posts._id" : req.body.postId },
        { $pull : { "posts.$.keywords" : req.body.keyword }}). 
        then( msg =>
            res.send({
                Success : req.body
            }))
}

module.exports.addKeyword = (req,res) => {
    if( req.body.keywords.indexOf(req.body.keyword) > -1 ){
       res.send({
           Error : "Exists"
       })
    }else{
    let keyword = req.body.keyword
    db.update
       ({  "posts._id" : req.body.postId },
       { $push : { "posts.$.keywords" : keyword }}). 
       then( msg =>
           res.send({
               Success : req.body
           }))
    }
}

module.exports.likeDislike = (req,res)=>{
    let uId = req.body.userId,
        likes = req.body.currentLikes;
    if( likes.indexOf(uId) > -1 ){
       db.update
       ({  "posts._id" : req.body.postId },
       { $pull : { "posts.$.likes" : uId }}). 
       then( msg =>
           res.send({
               Success : msg
        }))
    }else{
        db.update
       ({  "posts._id" : req.body.postId },
       { $push : { "posts.$.likes" : uId }}). 
       then( msg =>
           res.send({
               Success : msg
        }))
    }       
}

module.exports.changeStatus = (req,res)=>{
    db.update(
    {"posts._id" : req.body.postId},
    { "posts.$.status" : req.body.status  } ).
    then(()=> { 
        res.send({ Success : "Account status updated" })}
    )
}

module.exports.comment = (req,res)=>{
    let c = {
        at : `${new Date()}`.substr(0,10),
        comment : req.body.comment,
        user : req.body.user
    }    
    db.update
    ({  "posts._id" : req.body.postId },
    { $push : { "posts.$.comments" : c }}). 
    then( msg =>
        res.send({
            Success : msg
     })) 
}

module.exports.getComments = (req,res)=>{
    db.findOne({ "posts._id" : req.params.postId})
    .then( m => {
        let s = m.posts.filter( v => v._id == req.params.postId )
        res.send({
            comments : s[0].comments
        })})    
}