//************************
//			Suggestion Model
//************************
var mongoose = require("mongoose");


//creates a suggestion Schema
var suggestionSchema = mongoose.Schema({
	//the Suggestion will be a string
	quote: {
		type: String,
		required: "Cannot leave Suggestion Blank"
	},
	//the Artists name will be saved as a string
	artist: {
		type: String,
		required: "Cannot leave Artist Blank"
	},
	//the song will be saved as a string
	song: {
		type: String,
		required: "Cannot leave Song Blank"
	} //may change to link.
})

//turns the schema to a model
var Suggestion = mongoose.model("Suggestion", suggestionSchema);

//exports the Suggestion model
module.exports = Suggestion;