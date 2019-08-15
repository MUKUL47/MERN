const exp = require('express'), routes = exp(),
manipulatePost = require('./Routes/manipulatePost');

routes.delete('/deleteKeyword',manipulatePost.deleteKeyword)

routes.put('/addKeyword',manipulatePost.addKeyword)

routes.put('/likeDislike',manipulatePost.likeDislike)

routes.put('/changeStatus',manipulatePost.changeStatus)

routes.put('/comment',manipulatePost.comment)

routes.get('/comments/:postId',manipulatePost.getComments)

module.exports = routes