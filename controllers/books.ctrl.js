var Books=require('../models/books.model');
var Review=require('../models/review.model');

module.exports={

    getBooks:function(req,res){
        var count=0;
        var pageSize= +req.params.pagesize || 3;
        var pageIndex= +req.params.pageindex || 0;
        var sortBy= req.query.sort || "price";
        var sortDirection= req.query.sortDirection?(req.query.sortDirection).toLowerCase()==="asc"?"":"-":"-";
        Books.count()
        .exec()
        .then(function(cnt){
            count=cnt;
            var query=Books.find({},{'__v':0})
                .skip(pageIndex * pageSize)
                .limit(pageSize)
                .sort(sortDirection + sortBy);
            return query.exec();
        })
        .then(function(books){

            var response={
                metadata :{totalBooks:count,numberOfPages:Math.ceil(count/pageSize)},
                data: books
            };
            res.status(200);
            res.json(response);
        })
        .catch(function(err){
            res.status(401);
            res.send("No Books in the Library");
        })
        
    },
    getBookById:function(req,res){
        var id=req.params.id;
        Books.findById({_id:id},{'__v':0})
        .exec()
        .then(function(book){
            if(book){
                Review.find({bookid:id},{'__v':0})
                .exec()
                .then(function(reviews){
                    var jsonBook=book.toJSON();
                    jsonBook.reviews=reviews;
                    res.status(200);
                    res.json(jsonBook); 
                })
                
            }
            else{
                res.status(404);
                res.json("Book Details not found");
            }
        })
        .catch(function(err){
            res.status(500);
            res.send("Please try again later");
        })
    },

    donateBooks:function(req,res){
        var book= new Books(req.body);
        console.log(req.body);
        book.save()
        .then(function(books){
            res.status(201);
            res.json(books);
        })
        .then(function(err){
            res.status(500);
            res.send("Facing Server issue.Please try again later");
        })

    },

    removeBooks:function(req,res){
        var id=req.params.id;
        Books.findByIdAndRemove({_id:id})
        .then(function(err){
            if(!err){
                res.status(204);
                res.send("Book removed successfully");
            }
            else{
                res.status(500);
                res.send("Facing issues deleting the book.Try again later");
            }
        })
    },

    updateBooks:function(req,res){
    
        var Book=new Books(req.body);
        var id=req.params.id;

        Books.findByIdAndUpdate(id,{$set:{
            bookname:Book.bookname,
            author:Book.author,
            price:Book.price,
            available:Book.available
        }})
        .then(function(book){
             res.status(200);
             res.json(book);
        })
        .catch(function(err){
            res.status(500);
            res.send("Can not update.Please try again later");
        })

    }

}