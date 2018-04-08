//************************
//			Qoute Model
//************************
var mongoose = require("mongoose");


//creates a quote Schema
var quoteSchema = mongoose.Schema({
	//the Quote will be a string
	quote: {
		type: String,
		required: "Cannot leave Quote Blank"
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
var Quote = mongoose.model("Quote", quoteSchema);

//exports the Quote model
module.exports = Quote;