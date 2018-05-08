var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose")
//creates a model for the users
var userSchema  = new mongoose.Schema(
	{
		username: String,
		password: String
	});

//adds methods to user schema for authentication.  
userSchema.plugin(passportLocalMongoose);  //adds user serializing methods
module.exports = mongoose.model("User", userSchema);