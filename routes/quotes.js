var express = require("express");
var cors = require(cors);
var router = express.Router();
var db = require("../models");
const gPost = process.env.SECRETPOST;
const gPut = process.env.SECRETPUT + "/:id/";
const gDEL = process.env.SECRETDELETE + "/:id/";


//		INDEX
router.get("/", function(req, res){
	//finds all quotes in the database
	db.Quote.find({}, function(err, allQuotes){
		if(err){res.send(err);}
		else
		{
			//sends all events in the database as jason
			res.json(allQuotes);
		}
	})
}); 

//		CREATE
router.post(gPost, function(req, res){
	db.Quote.create(req.body, function(err, newQuote){
		if(err){
			res.send(err);
		}
		else{
			res.status(201).json(newQuote);
			console.log("Quote Created");
		}
	})
});
//		READ
router.get("/:id", function(req, res){
	//finds the specified quote
	db.Quote.findById(req.params.id, function(err, quote){
		//responds with a json object
		res.json(quote);
	})
})

//		UPDATE
router.put(gPost, function(req, res){
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
router.delete(gDEL, function(req, res){
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