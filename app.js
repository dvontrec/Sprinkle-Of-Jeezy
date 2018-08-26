//********************************
//		Basic Variables
//********************************
require('dotenv').config();
// imports a class that extends the string prototype so colors can be added to the console.
const colors = require('colors');
const express = require('express');
const port = process.env.PORT || 8000;
const flash = require('connect-flash');
const passport = require('passport');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const expressSanitizer = require('express-sanitizer');
const User = require('./models/user');
const Guest = require('./models/guest');
const localStrategy = require('passport-local');
const SpotifyStrategy = require('passport-spotify').Strategy;
const passportlocalMongoose = require('passport-local-mongoose');
const quoteRoutes = require('./routes/quotes');
const authRoutes = require('./routes/auth');
const suggestRoutes = require('./routes/suggestions');
const indexRoutes = require('./routes/index');
const spotifyRoutes = require('./routes/spotify');
const methodOverride = require('method-override');
const middleware = require('./middleware');
const app = express();

// require('./services/passport');
//tells application what packages to use
//tells app to pull files from public directory
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));
//Allows the application to use spotify authentication
app.use(
	cookieSession({
		name: 'Spotify User',
		maxAge: 60 * 60 * 1000, //saves the cookie for 60 minutes in an hour 60 seconds in a minute 1000 milliseconds in a second
		// encrypts the cookie
		keys: [process.env.COOKIE_KEY_1]
	})
);
//tells app to use _method for method-override
app.use(methodOverride('_method'));
//tells app to use express session
app.use(
	require('express-session')({
		//secret is used to encode and decode the sessions
		secret: process.env.SECRET,
		resave: false,
		saveUninitialized: false
	})
);
//tells the app to use flash
app.use(flash());

//setup cors
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*'); //Sets the header for all(*) changing second arg can ensure other web pages cant access api
	res.header('Access-Control-Allow-Headers', '*'); //defines headers that can be set
	//checks request method
	if (req.method === 'OPTIONS') {
		//PUT/POST
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE GET'); //all http words the api supports
		return res.status(200), json({}); //tells the route it is successful with those options
	}
	next(); //calls next function
});

//tells the app what parts of body parser to use
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//tells the app to use express sanitizer to escape form content
app.use(expressSanitizer());

//sets view engine to ejs
app.set('view engine', 'ejs');
//tells app to use passport
app.use(passport.initialize());
app.use(passport.session());
//creates a new local strategy
passport.use(new localStrategy(User.authenticate()));
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
//encodes data and puts it in the session
passport.serializeUser(User.serializeUser());
//reads the session and unencodes the data
passport.deserializeUser(User.deserializeUser());
passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	done(null, user);
});
//Sets the app up to see the user ans send flash
app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	next();
});

//********************************
//		Routes
//********************************
//use routes with specific path
app.use('/api/quotes', quoteRoutes);
app.use('/', authRoutes);
app.use('/api/suggestions', suggestRoutes);
app.use('/api/spotify', spotifyRoutes);
app.use('/', indexRoutes);

//********************************
//		Add listener
//********************************
app.listen(port, function() {
	console.log(`sprinkling on port ' + ${port}`.cyan);
});
