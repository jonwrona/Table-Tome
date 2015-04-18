var Spell = require('../models/spell');
var Sub = require('../models/subscriber');
var config = require('../../config');
var mailgun = require('mailgun-js')({apiKey: config.mailgunKey, domain: config.mailgunDomain});

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
            var data = {
                from: config.mailgunSendAddress,
                to: req.body.email,
                subject: 'You want to subscribe?',
                html: '<a href="http://localhost:8080/api/mail/validate/' + req.body.email + '">Click here to add your email address to a mailing list</a>'
            }
            mailgun.messages().send(data, function(err, body) {
                console.log(body);
                console.log(err);
                // if (err) {                    
                //     console.log('a mailing error occured: '.err);
                // } else {
                //     console.log(body+"We good");
                // }
            });
        });

    apiRouter.get('/mail/validate/:mail', function(req, res) {
        var members = [{
            address: req.params.mail
        }];
        mailgun.lists('updates@mail.tabletome.com').members().add({
            members: members,
            subscribed: true
        }, function(err, body) {
            console.log(body);
            if (err) {
                res.send("Error - check console");
            } else {
                res.send("Added to mailing list");
            }
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

    return apiRouter;

};
