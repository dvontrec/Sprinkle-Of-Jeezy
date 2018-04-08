var express = require("express");
var router = express.Router();
var db = require("../models");

//		CREATE
router.post("/", function(req, res){
	db.Quote.create(req.body, function(err, newQuote){
		if(err){
			res.send("broken here");
		}
		else{
			res.status(201).json(newToDo);
			console.log("Quote Created");
		}
	})
})
//		READ
router.get("/", function(req, res){
	res.send({"test": "pass"});
})
//		EDIT
//		UPDATE
//		DELETE

module.exports = router;