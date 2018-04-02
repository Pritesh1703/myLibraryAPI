var Review=require('../models/review.model');

module.exports={
    getReviews:function(req,res){
        var review=new Review(req.body);
        review.save()
        .then(function(reviews){
            res.status(201);
            res.json(reviews);
        })
        .catch(function(err){
            res.status(500);
            res.send("Error saving the review");
        })
    }
}