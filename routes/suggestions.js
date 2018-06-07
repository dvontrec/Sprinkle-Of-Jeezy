const express = require('express');
const router = express.Router();
const path = require('path');
const middleware = require('../middleware')
const db = require("../models");

router.get("/view", middleware.isLoggedIn, function(req, res)
{
	db.Suggestion.find({}, function(err, allSuggestions)
	{
		if(err){res.send(err)}
		else
		{
			res.redirect("../../adminSuggestions")
		}
	});
});

router.get("/all", function(req, res)
{
	db.Suggestion.find({}, function(err, allSuggestions)
	{
		if(err){res.send(err)}
		else
		{
			res.json(allSuggestions)
		}
	});
});

router.post('/confirm/:id', function(req, res)
{
	db.Suggestion.findById(req.params.id, function(err, suggestion)
	{
		//converts suggestion into a published quote
		const quote =
		{ 
			quote: suggestion.quote,
			artist: suggestion.artist,
			song: suggestion.song
		}

		db.Quote.create(quote, function(err, newQuote){
			if(err){
				res.send(err);
			}
			else
			{
				db.Suggestion.findByIdAndRemove(req.params.id, function(err)
				{
					if(err){ res.send(err);}
					else
					{
						req.flash('success', "Suggestion has been confirmed");
						res.redirect('/adminSuggestions');
					}
				})
			}
		});
	});
});


//		READ
router.get("/", function(req, res)
{
	res.render("suggestions/quoteSuggester");
});

//		CREATE
router.post("/", function(req, res){
	let quote = req.sanitize(req.body.quote);
	let artist = req.sanitize(req.body.artist);
	let song = req.sanitize(req.body.song);
	let suggestion = { quote, artist, song};
	console.log(suggestion)

	db.Suggestion.create(suggestion, function(err, newSuggestion){
		if(err){
			req.flash("error", err.message);
			res.redirect("back");
		}
		else
		{
			req.flash('success', 'Suggestion successfully submitted');
			res.redirect("/api/suggestions");
		}
	})
});

//		DELETE
router.delete("/:id", middleware.isLoggedIn, function(req, res){
	//finds the suggestion by the ID in the request
	db.Suggestion.remove({_id: req.params.id}, function(err){
		//if there is an error respond with the error
		if(err){res.send(err);}
		else
		{
			//send the message to let the user know that the qoute was deleted.  
			req.flash('success', "suggestion deleted");
			res.redirect('back');
		}
	})
});
module.exports = router;