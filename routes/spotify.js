const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi();
const passport = require('passport');
const router = express.Router();

router.get('/', (req, res) => {
	if (!req.guest) {
		return res.redirect('spotify/auth');
	}
	res.render('spotify-test');
});

router.post('/play/:uri', (req, res) => {
	if (!req.user) {
		res.redirect('/auth/spotify');
	}
	spotifyApi.setAccessToken(req.user.accessToken);
	spotifyApi.play(
		{
			uris: [req.params.uri]
		},
		(err, resp) => {
			if (err) {
				console.log(err);
			}
			res.send('working');
		}
	);
});
router.get(
	'/auth',
	passport.authenticate('spotify', {
		scope: [
			'streaming',
			'user-read-birthdate',
			'user-read-email',
			'user-read-private'
		],
		showDialog: true
	}),
	(req, res) => {
		// The request will be redirected to spotify for authentication, so this
		// function will not be called.
		res.redirect('auth/callback');
	}
);
router.get(
	'/auth/callback',
	passport.authenticate('spotify', { failureRedirect: '/wrong' }),
	(req, res) => {
		// Successful authentication, redirect home.
		res.redirect('/');
	}
);

router.get('/wrong', (req, res) => {
	res.send('Cannot login bro');
});

module.exports = router;
