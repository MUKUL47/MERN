module.exports.create = (req,res)=>{
    let post = {
        title : req.body.title,
        content : req.body.content,
        at : new Date()
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