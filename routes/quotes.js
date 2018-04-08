var express = require("express");
var router = express.Router();
var db = require("../models");

//		CREATE
router.post("/", function(req, res){
	db.Quote.create(req.body, function(err, newQuote){
		if(err){
			res.send(err);
		}
		else{
			res.status(201).json(newQuote);
			console.log("Quote Created");
		}
	})
})
//		READ
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
})

//			*TODO*
//		EDIT *No need to edit now, but will program last*

//		UPDATE

//		DELETE
router.delete("/:id", function(req, res){
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
})
module.exports = router;