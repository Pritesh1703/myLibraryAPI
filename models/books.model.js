var mongoose=require('mongoose');

module.exports=mongoose.model("Books",{

    bookname: {type:String},
    author: String,
    price: Number,
    available: Boolean,
    lastUpdated: {type:Date,default:Date.now()}

})