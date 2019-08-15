const exp = require('express'), routes = exp(),
posts = require('./routes/posts')

routes.post("/:id/post",posts.create)
routes.get("/posts/:id",posts.getPosts)
routes.get("/post/:id",posts.getPost)

module.exports  = routes