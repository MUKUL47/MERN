var db
mongo = require('mongoose');
mongo.connect("mongodb://localhost/user");
       module.exports.user = 
       new mongo.Schema({
        username : String,
        password : String,
        email : String,
        at : Date,
        currentStatus : {          
          isActive : Boolean || false,
          token : Number,
          expiresIn : String
        },
        posts : [{
          title : String,
          content : String,
          at : Date,
        }],
        friends : [{
          id : String,
          name : String,
          at : Date,
        }],
        requests : [{
          id : String,
          name : String,
          at : Date,
        }] 
      }); 
 