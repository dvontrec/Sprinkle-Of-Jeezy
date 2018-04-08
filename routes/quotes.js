const express = require("express");
const router = express.Router();
const db = require("../models");

//		CREATE
router.post("/", function(req, res){
	db.Quote.create(req.body, function(err, newQuote){
		if(err){res.send(err);}
		else{
			console.log("Quote Created");
			res.send(newQuote);
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