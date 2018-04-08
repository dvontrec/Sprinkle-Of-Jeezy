//connect to mongoose
var mongoose = require("mongoose");

//allow debugging
mongoose.set("debug", true);

//Create/Connect to database
mongoose.connect("mongodb://localhost/sprinkle-of-jeezy-api");

//allows use of promises
mongoose.Promise = Promise;

//sends out the Qoute model to any file accessing this index file
module.exports.Quote = require("./quote");