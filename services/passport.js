require('dotenv').config();

const passport = require('passport');
const mongoose = require('mongoose');
const SpotifyStrategy = require('passport-spotify').Strategy;
const Guest = require('../models/guest');

const mongoURL = process.env.DATABASEURL || 'mongodb://localhost/hello-spotify';

mongoose.connect(mongoURL);
// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize Guests into and deserialize Guests out of the session. Typically,
//   this will be as simple as storing the Guest ID when serializing, and finding
//   the Guest by ID when deserializing. However, since this example does not
//   have a database of Guest records, the complete spotify profile is serialized
//   and deserialized.
passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	Guest.findById(id).then(user => {
		done(null, user);
	});
});

passport.use(
	new SpotifyStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: '/api/spotify/auth/callback'
		},
		async (accessToken, refreshToken, expires_in, profile, done) => {
			// Finds the existing user and deletes it
			const existingUser = await Guest.remove({
				spotifyId: profile.id
			});
			const user = await new Guest({
				name: profile.displayName,
				profilePic: profile.photos[0],
				spotifyId: profile.id,
				accessToken: accessToken,
				refreshToken: refreshToken
			}).save();
			done(null, user);
		}
	)
);
