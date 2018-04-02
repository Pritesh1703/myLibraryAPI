var mongoose=require('mongoose');

module.exports=mongoose.model('Review',{
    bookid: String,
    name: String,
    subject: String,
    message: String,
    rating: Number,
    lastUpdated: {type:Date,default:Date.now()}
})