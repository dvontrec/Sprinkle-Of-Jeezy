const express = require("express");
const router = express.Router();
const db = require("../models"); 
const middleware = require("../middleware");



//		INDEX
router.get("/", function(req, res){
	//finds all quotes in the database
	db.Quote.find({}, function(err, allQuotes){
		//if there is an error send the error 
		if(err){res.send(err);}
		else
		{
			//generates a random number from 0 till the length of all quotes
			let rNum = Math.floor(Math.random()*allQuotes.length);
			//sends the quote at the random index;
			res.json(allQuotes[rNum]);
		}
	})
});

router.get("/asadmin", middleware.isAdmin, function(req, res)
{
	db.Quote.find({}, function(err, allQuotes)
	{
		if(err)
		{
			console.log(err);
		}
		else
		{
			res.render("quotes/adminQuotes", {quotes: allQuotes});
		}
	});
}) 

//		CREATE
router.post("/", middleware.isAdmin, middleware.sanitizeBody, function(req, res){
	db.Quote.create(req.body, function(err, newQuote){
		if(err){
			req.flash('error', err.message);
			res.redirect('back');
		}
		else
		{
			req.flash('success', 'quote successfully submitted');
			res.redirect('back');
		}
	})
});
//		READ
router.get("/:id", middleware.isAdmin, function(req, res){
	//finds the specified quote
	db.Quote.findById(req.params.id, function(err, quote){
		res.render("quotes/editQuote", {quote: quote})
	})
})

//		UPDATE
router.put("/:id", middleware.isAdmin, middleware.sanitizeBody, function(req, res){
	//finds the quote in the database by the id
	db.Quote.findOneAndUpdate({_id: req.params.id}, req.body, {new:true}, function(err, updatedQuote){
		//if there is an error
		if(err){
			req.flash('flash', err);
			res.redirect('back');
		}
		else
		{
			req.flash('success', 'Quote updated');
			//responds with the updated quote
			res.redirect('/api/quotes/asadmin');
		}
	})
});

//		DELETE
router.delete("/:id", middleware.isAdmin, function(req, res){
	//finds the qupte by the ID in the request
	db.Quote.remove({_id: req.params.id}, function(err){
		//if there is an error respond with the error
		if(err){
			req.flash('error', err);
			res.redirect('back');
		}
		else
		{
			//send the message to let the user know that the qoute was deleted.  
			req.flash('success', 'Quote successfully deleted');
			res.redirect('asadmin');
		}
	})
});
module.exports = router;