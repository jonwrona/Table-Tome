var Spell = require('../models/spell');
var Sub = require('../models/subscriber');
var jwt = require('jsonwebtoken');
var config = require('../../config');
var request = require('request');

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

    var verifyRecaptcha = function(key, callback) {
        request.post({
                url: 'https://www.google.com/recaptcha/api/siteverify',
                form: {
                    secret: captchaSecret,
                    response: key
                }
            },
            function(err, res, body) {
                var data = "";
                res.on('data', function(chunk) {
                    data += chunk.toString();
                });
                res.on('end', function() {
                    try {
                        var parsedData = JSON.parse(data);
                        console.log(parsedData);
                        callback(parsedData.success);
                    } catch (e) {
                        callback(false);
                    }
                });
            });
    };

    apiRouter.route('/mail')
        .post(function(req, res) {
            verifyRecaptcha(req.body['g-recaptcha-response'], function(success) {
                if (success) {
                    var sub = new Subcriber();
                    sub.name = req.body.name;
                    sub.email = req.body.password;
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
                            message: 'Welcome!'
                        });
                    });
                } else {
                    return res.json({
                        success: false,
                        message: "Captcha failed! Try again?"
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
