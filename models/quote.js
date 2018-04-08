//************************
//			Qoute Model
//************************
const mongoose = require("mongoose");


//creates a quote Schema
const quoteSchema = mongoose.Schema({
	//the Quote will be a string
	Quote: {
		type: String,
		required: "Cannot leave Quote Blank"
	}
	//the Artists name will be saved as a string
	Artist: {
		type: String,
		required: "Cannot leave Artist Blank"
	}
	//the song will be saved as a string
	Song: {
		type: String,
		required: "Cannot leave Song Blank"
	} //may change to link.
})

//turns the schema to a model
const Quote = mongoose.model("Quote", quoteSchema);

//exports the Quote model
module.exports = Quote;