const express = require('express');
const router = express.Router();
const db = require("../models");

router.get("/", function(req, res)
{
	res.render("quoteSuggester");
});

//		CREATE
router.post("/", function(req, res){
	console.log(req.body.artist)
	db.Suggestion.create(req.body, function(err, newSuggestion){
		if(err){
			res.send(err);
		}
		else
		{
			res.send(newSuggestion);
		}
	})
});

module.exports = router;