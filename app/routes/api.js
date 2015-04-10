var Spell = require('../models/spell');
var Sub = require('../models/subscriber');
var config = require('../../config');
var kb = require('kickbox').client(config.kickboxKey).kickbox();

var superSecret = config.secret;

module.exports = function(app, express) {

    var apiRouter = express.Router();

    apiRouter.use(function(req, res, next) {
        next();
    });

    apiRouter.get('/', function(req, res) {
        res.json({
            message: 'hooray! welcome to our api!'
        });
    });

    apiRouter.route('/mail')
        .post(function(req, res) {
            var sub = new Sub();
            sub.name = req.body.name;
            sub.email = req.body.email;
            Sub.findOne({
                email: sub.email
            }, function(err, user) {
                if (user) {
                    return res.json({
                        success: false,
                        message: 'Someone has already subscribed with that email.'
                    });
                } else {
                    kb.verify(sub.email, function(err, res0) {
                        if (res0 === undefined) {
                            return res.json({
                                success: false,
                                message: 'I\'m sorry, but we cannot accept any more subscribers today. Please try again tomorrow.'
                            });
                        } else if (res0.body.result == 'deliverable') {
                            sub.save(function(err) {
                                if (err) {
                                    return res.send(err);
                                }
                                return res.json({
                                    success: true,
                                    message: 'Welcome to the mailing list!'
                                });
                            });
                        } else {
                            return res.json({
                                success: false,
                                message: 'Email address is invalid.'
                            });
                        }
                    });
                }
            });
        });

    apiRouter.route('/mail/:sub_id')
        .delete(function(req, res) {
            Sub.remove({
                _id: req.params.sub_id
            }, function(err, user) {
                if (err) return res.send(err);
                return res.json({
                    message: 'Successfully deleted'
                });
            });
        });

    apiRouter.route('/spells/basic')
        .get(function(req, res) {
            Spell.find({
                'permissionLvl': 'basic'
            }, function(err, spells) {
                if (err) return res.send(err);
                res.json(spells);
            });
        });

    return apiRouter;

};
