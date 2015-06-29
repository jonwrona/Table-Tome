var Spell = require('../models/spell');
var User = require('../models/user');
var config = require('../../config');
var validator = require('mailgun-email-validation');
var mailgun = require('mailgun-js')({
    apiKey: config.mailgunKey,
    domain: config.mailgunDomain
});
var path = require('path');
var fs = require('fs');

module.exports = function(app, express) {

    var basicRouter = express.Router();

    basicRouter.use(function(req, res, next) {
        next();
    });

    basicRouter.get('/', function(req, res) {
        res.json({
            message: 'welcome to the basic tabletome routes!'
        });
    });

    basicRouter.route('/authenticate')
        .post(function(req, res) {
            console.log('processing a login request');
            User.findOne({
                username: req.body.username
            }).select('username password').exec(function(err, user) {
                if (err) throw err;
                if (!user) {
                    res.json({
                        success: false,
                        message: 'Authentication failed. User not found.'
                    });
                } else if (user) {
                    var validPassword = user.comparePassword(req.body.password);
                    if (!validPassword) {
                        res.json({
                            success: false,
                            message: 'Authentication failed. Wrong password.'
                        });
                    } else {
                        var token = jwt.sign({
                            username: user.username
                        }, config.supersecret, {
                            expiresInMinutes: 1440 // 24 hours
                        });

                        res.json({
                            success: true,
                            message: 'Authentication successful.',
                            token: token
                        });
                    }
                }
            });
        });

    basicRouter.route('/spells')
        .get(function(req, res) {
            Spell.find({}, function(err, spells) {
                if (err) return res.send(err);
                res.json(spells);
            });
        }).post(function(req, res) {
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
            spell.verbal = req.body.verbal;
            spell.somatic = req.body.somatic;
            spell.material = req.body.material;
            spell.description = req.body.description;

            spell.save(function(err) {
                if (err) return res.send(err);
                res.json({
                    message: 'Spell created!'
                });
            });
        });
        

    return basicRouter;

};
