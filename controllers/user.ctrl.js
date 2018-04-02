var bcrypt=require('bcrypt');
var jwt=require('jsonwebtoken');
var User=require('../models/users.model');
var config=require('../utilities/config');

module.exports={
    signup:function(req,res){
        var bcryptpwd=bcrypt.hashSync(req.body.password,2);

        var users=new User(req.body);

        users.save()
        .then(function(user){
            var jsonUser=user.toJSON();
            delete jsonUser.password;
            res.status(201);
            res.json(jsonUser);
        })
        .catch(function(err){
            if(err && err.errmsg && err.errmsg.indexOf("duplicate key error index")>-1){
                res.status(500);
                res.send("User Already Exists.Please Sign in.");
            }
            else{
                res.status(500);
                res.send(err);
            }
           
        })
    },
    signin:function(req,res){
        
        User.findOne({username:req.body.username})
        .exec()
        .then(function(user){
            if(user){
                var result=bcrypt.compareSync(req.body.password,user.password);
                if(result){
                    res.status(200);
                    var token=jwt.sign({username:req.body.username},config.password,{expiresIn: config.expiry});
                    var response={
                        username:req.body.username,
                        token:token
                    }
                    res.json(response);

                }
            }
            

        })
        
    }

}