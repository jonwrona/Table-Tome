// BASE SETUP
// ============

// CALL THE PACKAGES
// -------------------
var express = require('express'), app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');
var path = require('path');

var User = require('./public/app/models/user');

// APP CONFIGURATION
// ===================
// use body parser to grab info from POST requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// connect to the database
mongoose.connect(config.database);

// set static files location
app.use(express.static(__dirname + '/public'));


// ROUTES
// ========

// ROUTES FOR OUR API
// --------------------
var apiRouter = express.Router();

apiRouter.use(function(req, res, next) {
	console.log('somebody just came to our app!');
	// authenticate users here Chptr 10
	next();
});

apiRouter.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });
});

app.use('/api', apiRouter);

// USERS
// -------
apiRouter.route('/users')
	.post(function(req, res) {
		var user = new User();
		user.username = req.body.username;
		user.password = req.body.password;
		user.permissions = 'basic'
		user.save(function(err) {
			if (err) {
				if (err.code == 11000)
					return res.json({ success: false, message: 'A user with that username already exists.' });
				else
					return res.send(err);
			}
			res.json({ message: 'User created!' });
		});
	})
	.get(function(req, res) {
		User.find(function(err, users) {
			if (err) res.send(err);
			res.json(users);
		});
	});
apiRouter.route('/users/:user_id')
	.post(function(req, res) {
		User.findById(req.params.user_id, function(err, user) {
			if (err) res.send(err);
			if (req.body.username) user.username = req.body.username;
			if (req.body.password) user.password = req.body.password;
			user.save(function(err) {
				if (err) res.send(err);
				res/json({ message: 'User updated!' });
			});
		});
	})
	.get(function(req, res) {
		User.findById(req.params.user_id, function(err, user){
			if (err) res.send(err);
			res.json(user);
		});
	})
	.delete(function(req, res) {
		User.remove({
			_id: req.params.user_id
		}, function(err, user) {
			if (err) return res.send(err);
			res.json({ message: 'Successfully deleted' });
		});
	});


// START THE SERVER
// ==================
app.listen(config.port);
console.log('Application running on post ' + config.port);
