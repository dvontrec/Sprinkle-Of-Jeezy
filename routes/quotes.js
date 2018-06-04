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
			res.render("adminQuotes", {quotes: allQuotes});
		}
	});
}) 

//		CREATE
router.post("/", middleware.isAdmin, function(req, res){
	db.Quote.create(req.body, function(err, newQuote){
		if(err){
			res.send(err);
		}
		else
		{
			res.redirect("/api/quotes/asadmin");
		}
	})
});
//		READ
router.get("/:id", middleware.isAdmin, function(req, res){
	//finds the specified quote
	db.Quote.findById(req.params.id, function(err, quote){
		res.render("editQuote", {quote: quote})
	})
})

//		UPDATE
router.put("/:id", middleware.isAdmin, function(req, res){
	//finds the quote in the database by the id
	db.Quote.findOneAndUpdate({_id: req.params.id}, req.body, {new:true}, function(err, updatedQuote){
		//if there is an error
		if(err){res.send(err);}
		else
		{
			//responds with the updated quote
			res.json(updatedQuote);
		}
	})
});

//		DELETE
router.delete("/:id", middleware.isAdmin, function(req, res){
	//finds the qupte by the ID in the request
	db.Quote.remove({_id: req.params.id}, function(err){
		//if there is an error respond with the error
		if(err){res.send(err);}
		else
		{
			//send the message to let the user know that the qoute was deleted.  
			res.json({message: "Quote Deleted"});
		}
	})
});
module.exports = router;