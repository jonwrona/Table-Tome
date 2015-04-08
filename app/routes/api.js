var Spell = require('../models/spell');
var Sub = require('../models/subscriber');
var jwt = require('jsonwebtoken');
var config = require('../../config');

var superSecret = config.secret;

module.exports = function(app, express) {

	var apiRouter = express.Router();


	apiRouter.use(function(req, res, next) {
		next();
	});

	apiRouter.get('/', function(req, res) {
		res.json({ message: 'hooray! welcome to the tabletome api!' });
	});

	apiRouter.route('/subscribers')
	.post(function(req, res) {
		var sub = new Sub();
		sub.name = req.body.name;
		sub.email = req.body.email;

		sub.save(function(err) {
			if (err) {
				if (err.code == 11000)
					return res.json({ success: false, message: 'Someone has already subscribed with that email.'});
				else return res.send(err);
			}
			res.json({message: 'Subscriber added!'});
		});
	});

	apiRouter.route('/subscribers/:sub_id')
	.delete(function(req, res) {
		Sub.remove({
			_id: req.params.sub_id
		}, function(err, user) {
			if (err) return res.send(err);
			res.json({message: 'Successfully deleted'});
		});
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