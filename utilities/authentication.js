var jwt=require('jsonwebtoken');
var config=require('../utilities/config');

function isAuthenticated(req,res,next){
    var authHeader=req.headers["authorization"];
    if(authHeader){
        var token=jwt.verify(authHeader,config.password,function(err,success){
            if(success){
                next();
            }
            else{
                res.status(404);
                res.send("Bad credentials.You are not authorized to use this library.")
            }
           
        })
    }
    else{
        res.status(404);
        res.send("You are not authorized to use this library.Please grab a token.")
    }
}

module.exports=isAuthenticated;