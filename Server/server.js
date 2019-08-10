const exp = require('express'),
       bp = require('body-parser'),       
       mongo = require('mongoose'),
       userDb = require('./Database/Schema').user,
       cookieParser = require('cookie-parser')
       db = mongo.model("user1",userDb);
       sha256 = require('sha256')
       routes = exp()   
       routes.use(cookieParser()) 
       routes.use(require('body-parser').urlencoded({extended: true}));
       
    routes.use(bp.json())    
    routes.get("/all",(req,res)=>{db.find({}).then(msg => res.send(JSON.stringify(msg)))})
    routes.get("/del",(req,res)=>{db.remove({}).then(msg => res.send(JSON.stringify(msg)))})
    routes.use(require('./Routes/LoginRegister/controller.js')) 
    routes.use(require('./Routes/Posts/controller.js')) 
    routes.listen(2999)

