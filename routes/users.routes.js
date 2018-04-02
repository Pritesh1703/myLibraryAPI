var express= require('express');
var userCtrl=require('../controllers/user.ctrl');

var Router=express.Router();

Router.post('/signup',userCtrl.signup);
Router.post('/signin',userCtrl.signin);

module.exports=Router;