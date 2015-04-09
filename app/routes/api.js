var Spell = require('../models/spell');
var Sub = require('../models/subscriber');
var config = require('../../config');
var emailExist = require('email-existence');

var superSecret = config.secret;
var captchaSecret = config.recaptchaSecret;

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
            console.log(sub.email);
            emailExist.check(sub.email, function(err, valid) {
                console.log(valid);
                if (valid) {
                    console.log('here1 : true')
                    sub.save(function(err) {
                        if (err) {
                            if (err.code == 11000)
                                return res.json({
                                    success: false,
                                    message: 'Someone has already subscribed with that email.'
                                });
                            else
                                return res.send(err);
                        }
                        return res.json({
                            success: true,
                            message: 'Welcome to the mailing list!'
                        });
                    });
                } else {
                    console.log('here2 : false');
                    return res.json({
                        success: false,
                        message: 'That isn\'t a real email address!'
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
                res.json({
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
