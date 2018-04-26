var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose")
//creates a model for the users
var userSchema  = new mongoose.Schema(
	{
		username: String,
		Password: String,
		isAdmin: Boolean
	});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);