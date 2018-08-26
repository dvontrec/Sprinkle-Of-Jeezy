const mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
const { Schema } = mongoose;

const guestSchema = new Schema({
	name: String,
	profilePic: String,
	spotifyId: String,
	accessToken: String,
	refreshToken: String
});
guestSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('Guest', guestSchema);
