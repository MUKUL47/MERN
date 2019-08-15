module.exports.create = (req,res)=>{ 
    let post = {
        title : req.body.title,
        content : req.body.content,
        at : new Date(),
        status : req.body.status,
        keywords : req.body.keywords
    }
    db.updateOne({ _id : req.params.id },{ $push : { posts : post }})
    .then( msg => res.status(201).send({
        Success : msg
    }))
    .catch(err =>
         res.status(403).send({ Error : "Some error has occured try again later some time" })
         )
}

module.exports.getPosts = (req,res)=>{
    db.find({ _id : req.params.id })
    .then(msg => res.send({ Success : msg[0].posts }))
    .catch(err =>
         res.status(403).send({ Error : "Some error has occured try again later some time" })
         )    
}

module.exports.getPost = (req,res)=>{
    db.findOne({ "posts._id" : req.params.id })
    .then( m => {
        let s = m.posts.filter( v => v._id == req.params.id )
        res.send({
            post : s,
            name : m.username
        })
    }
    )
}