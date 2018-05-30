//connect to mongoose
var mongoose = require("mongoose");
//saves the database url to a variable
const url = process.env.DATABASEURL || "mongodb://localhost/sprinkle";  //set up by using (export DATABASEURL=(enter url here)) in the terminal

//allow debugging
mongoose.set("debug", true);

//Create/Connect to database
mongoose.connect(url);

//allows use of promises
mongoose.Promise = Promise;

//sends out the Qoute model to any file accessing this index file
module.exports.Quote = require("./quote");
module.exports.User = require("./user");
module.exports.Suggestion = require("./suggestion")