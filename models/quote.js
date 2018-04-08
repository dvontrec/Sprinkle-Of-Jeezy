//************************
//			Qoute Model
//************************
const mongoose = require("mongoose");


//creates a quote Schema
const quoteSchema = mongoose.Schema({
	//the Quote will be a string
	Quote: String,
	//the Artists name will be saved as a string
	Artist: String,
	//the song will be saved as a string
	Song: String, //may change to link.
})

//turns the schema to a model
const Quote = mongoose.model("Quote", quoteSchema);

//exports the Quote model
module.exports = Quote;