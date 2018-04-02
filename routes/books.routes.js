var express=require('express');
var booksCtrl=require('../controllers/books.ctrl');
var reviewsCtrl=require('../controllers/review.ctrl');

var Router=express.Router();

Router.get('/',booksCtrl.getBooks);
Router.get('/:pageindex/:pagesize',booksCtrl.getBooks);
Router.get('/:id',booksCtrl.getBookById);
Router.post('/',booksCtrl.donateBooks);
Router.delete('/:id',booksCtrl.removeBooks);
Router.put('/:id',booksCtrl.updateBooks);
Router.post('/reviews',reviewsCtrl.getReviews);

module.exports=Router;