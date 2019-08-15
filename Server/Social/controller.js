const exp = require('express'), routes = exp(),
social = require('./Routes/social');

routes.get('/relationship/:ownerId/:userId',social.relationship)

routes.put('/sendRequest/:from/:to',social.sendRequest)

routes.put('/requestResponse/:from/:to/:answer',
            social.requestResponse)

routes.delete('/removeUser/:owner/:friend',social.removeUser)

module.exports = routes