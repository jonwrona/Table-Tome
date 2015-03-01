var User = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../../config');

var superSecret = config.secret;

module.exports = function(app, express) {

	var userRouter = express.Router();

	userRouter.use(function(req, res, next) {
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
					next();
				}
			});
		} else {
			return res.status(403).send({
				success: false,
				message: 'No token provided.'
			});
		}
	});

	userRouter.get('/', function(req, res) {
		res.json({ message: 'hooray! welcome to the user api!' });
	});

	userRouter.post('/authenticate', function(req, res) {
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

	return userRouter;

};