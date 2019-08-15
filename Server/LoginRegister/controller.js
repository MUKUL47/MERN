const exp = require('express'), routes = exp(),
loginRegister = require('./routes/loginRegister')

// routes.use(require('./routes/gmail/gmailApi'))

routes.get("/welcome",loginRegister.welcome)

routes.post("/Login",loginRegister.Login)

routes.post("/Register",loginRegister.Register)

routes.get("/getLastLogged",loginRegister.getLastLogged)

routes.put('/updateStatus',loginRegister.updateStatus)

routes.get("/logout",loginRegister.logout)

module.exports  = routes