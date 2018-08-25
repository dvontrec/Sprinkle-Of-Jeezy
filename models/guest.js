const mongoose = require('mongoose');
const { Schema } = mongoose;

const guestSchema = new Schema({
	name: String,
	profilePic: String,
	spotifyId: String,
	accessToken: String,
	refreshToken: String
});

module.exports = mongoose.model('Guest', guestSchema);
