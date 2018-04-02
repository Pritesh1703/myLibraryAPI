var express=require("express");
var mongoose=require("mongoose");
var bodyParser=require("body-parser");
var booksRouter=require("./routes/books.routes");
var usersRouter=require("./routes/users.routes");
var isAuthenticated=require("./utilities/authentication");

var app=express();

var port=process.env.PORT || 3000;
app.listen(port,function(){
    console.log("Server running on port:" + port);
})

mongoose.connect("mongodb://admin:admin@ds113019.mlab.com:13019/library-db")
console.log("Connection to db successful");

app.use(bodyParser.json());

app.get('/',function(req,res){
    res.send("Donate books in my library");
});

app.use('/api/users',usersRouter);
app.use(isAuthenticated);
app.use('/api/books',booksRouter);