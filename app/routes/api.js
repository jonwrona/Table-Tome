var User = require('../models/user');
var Spell = require('../models/spell');
var jwt = require('jsonwebtoken');
var config = require('../../config');

var superSecret = config.secret;

module.exports = function(app, express) {

	var apiRouter = express.Router();

	apiRouter.post('/authenticate', function(req, res) {
		console.log(req.body.username);
		User.findOne({
			username: req.body.username
		}).select('password').exec(function(err, user){
			if (err) throw err;

			if (!user) {
				res.json({
					success: false,
					message: 'Authentication failed! User not found.'
				});
			} else if (user) {
				var validPassword = user.comparePassword(req.body.password);
				if (!validPassword) {
					res.json({
						success: false,
						message: 'Authentication failed. Incorrect password.'
					});
				} else {
					var token = jwt.sign(user, superSecret, {
						expiresInMinutes: 1440 // 24 hours
					});
					res.json({
						success: true,
						message: 'Token generated.',
						token: token
					});
				}
			}
		});
	});

	apiRouter.use(function(req, res, next) {
		console.log('somebody just came to our app!');

		var token = req.body.token || req.param('token') || req.headers['x-access-token'];
		if (token) {
			jwt.verify(token, superSecret, function(err, decoded) {
				if (err) {
					return res.json({
						success: false,
						message: 'Failed to authenticate token.'
					});
				} else {
					req.decoded = decoded;
				}
			});
		} else {
			return res.status(403).send({
				success: false,
				message: 'No token provided.'
			});
		}

		next();
	});

	apiRouter.get('/', function(req, res) {
		res.json({ message: 'hooray! welcome to the tabletome api!' });
	});

	// on routes that end in '/users'
	// --------------------------------
	apiRouter.route('/users')
	.post(function(req, res) {
		var user = new User();
		user.username = req.body.username;
		user.password = req.body.password;
		if (req.body.admin) user.admin = req.body.admin;
		if (req.body.accessContent) user.accessContent = req.body.accessContent;
		if (req.body.accessCustom) user.accessCustom = req.body.accessCustom;
		user.save(function(err){
			if (err) return res.send(err);
			res.json({ message: 'User created!' });
		});
	})
	.get(function(req, res) {
		User.find(function(err, users){
			if (err) return res.send(err);
			res.json(users);
		});
	});

	// on routes that end in '/users/:user_id'
	// -----------------------------------------
	apiRouter.route('/users/:user_id')
	.get(function(req, res) {
		User.findById(req.params.user_id, function(err, user) {
			if (err) return res.send(err);
			res.json(user);
		});
	})
	.put(function(req, res) {
		User.findById(req.params.user_id, function(err, user) {
			if (err) return res.send(err);
			if (req.body.username) user.username = req.body.username;
			if (req.body.password) user.password = req.body.password;
			if (req.body.admin) user.admin = req.body.admin;
			if (req.body.accessContent) user.accessContent = req.body.accessContent;
			if (req.body.accessCustom) user.accessCustom = req.body.accessCustom;
			user.save(function(err) {
				if (err) return res.send(err);
				res.json({ message: 'User updated!' });
			});
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

	apiRouter.route('/users/:user_id/spells')
	.get(function(req, res) {
		User.findById(req.params.user_id, function(err, user) {
			if (err) return res.send(err);
			// get custom spells here
			res.json({ message: 'Getting users custom spells!' });
		});
	});

	// api endpoint to get user information
	// --------------------------------------
	apiRouter.get('/me', function(req, res) {
		res.send(req.decoded);
	});

	// on routes that end in '/spells'
	// ---------------------------------
	apiRouter.route('/spells')
	.post(function(req, res) {
		var spell = new Spell();
		spell.permissionLvl = req.body.permissionLvl
		spell.custom = req.body.custom;
		if (spell.custom) spell.author = req.body.author;
		if (!spell.custom) spell.books = req.body.books;
		spell.name = req.body.name;
		spell.level = req.body.level;
		spell.school = req.body.school;
		spell.ritual = req.body.ritual;
		spell.classes = req.body.classes;
		spell.castingTime = req.body.castingTime;
		spell.duration = req.body.duration;
		spell.range = req.body.range;
		spell.visual = req.body.visual;
		spell.somatic = req.body.somatic;
		spell.material = req.body.material;
		spell.description = req.body.description;

		spell.save(function(err) {
			if (err) return res.send(err);
			res.json({ message: 'Spell created!' });
		});
	})
	.get(function(req, res) {
		Spell.find(function(err, spells){
			if (err) return res.send(err);
			res.json(spells);
		});
	});

	// on routes that end in '/spells/:contentType'
	// ----------------------------------------------
	apiRouter.route('/spells/:permLvl')
	.get(function(req, res) {
		Spell.find({ 'permissionLvl': req.params.permLvl }, function(err, spells) {
			if (err) return res.send(err);
			res.json(spells);
		});
	});

	return apiRouter;

};