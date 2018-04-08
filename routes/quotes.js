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
//		EDIT
//		UPDATE
//		DELETE

module.exports = router;