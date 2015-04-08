var User = require('../models/user');
var Spell = require('../models/spell');
var jwt = require('jsonwebtoken');
var config = require('../../config');

var superSecret = config.secret;

module.exports = function(app, express) {

	var apiRouter = express.Router();


	apiRouter.use(function(req, res, next) {
		console.log('somebody just came to our app!');

		next();
	});

	apiRouter.get('/', function(req, res) {
		res.json({ message: 'hooray! welcome to the tabletome api!' });
	});


	apiRouter.route('/spells/basic')
	.get(function(req, res) {
		Spell.find({ 'permissionLvl': 'basic' }, function(err, spells) {
			if (err) return res.send(err);
			res.json(spells);
		});
	});

	return apiRouter;

};