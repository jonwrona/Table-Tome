var Spell = require('../models/spell');
var Sub = require('../models/subscriber');
var config = require('../../config');
var validator = require('mailgun-email-validation');
var mailgun = require('mailgun-js')({
    apiKey: config.mailgunKey,
    domain: config.mailgunDomain
});
var path = require('path');
var fs = require('fs');
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
            validator.check(req.body.email, function(err, valid) {
                if (err || !valid) {
                    return res.json({
                        success: false,
                        message: 'Your email failed to pass the validation test.'
                    });
                } else {
                    mailgun.lists('updates@mail.tabletome.com')
                        .members(req.body.email).info(function(err, body) {
                            if (body.member && body.member.subscribed) {
                                return res.json({
                                    success: false,
                                    message: 'That address is already subscribed.'
                                });
                            } else {
                                var link = req.get('host') + '/api/mail/validate/' + req.body.email;
                                var data = {
                                    from: config.mailgunSendAddress,
                                    to: req.body.email,
                                    subject: 'Confirm your subscription to our mailing list',
                                    html: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" style="font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><head> <meta name="viewport" content="width=device-width"/> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/> <title>Actionable emails e.g. reset password</title> <style type="text/css"> img{max-width: 100%;}body{-webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; line-height: 1.6;}body{background-color: #f6f6f6;}@media only screen and (max-width: 640px){body{padding: 0 !important;}h1{font-weight: 800 !important; margin: 20px 0 5px !important;}h2{font-weight: 800 !important; margin: 20px 0 5px !important;}h3{font-weight: 800 !important; margin: 20px 0 5px !important;}h4{font-weight: 800 !important; margin: 20px 0 5px !important;}h1{font-size: 22px !important;}h2{font-size: 18px !important;}h3{font-size: 16px !important;}.container{padding: 0 !important; width: 100% !important;}.content{padding: 0 !important;}.content-wrap{padding: 10px !important;}.invoice{width: 100% !important;}}</style></head><body itemscope itemtype="http://schema.org/EmailMessage" style="font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; line-height: 1.6; background: #f6f6f6; margin: 0;"> <table class="body-wrap" style="font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; background: #f6f6f6; margin: 0;"> <tr style="font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"> <td style="font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;" valign="top"></td><td class="container" width="600" style="font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; display: block !important; max-width: 600px !important; clear: both !important; margin: 0 auto;" valign="top"> <div class="content" style="font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; max-width: 600px; display: block; margin: 0 auto; padding: 20px;"> <table class="main" width="100%" cellpadding="0" cellspacing="0" itemprop="action" itemscope itemtype="http://schema.org/ConfirmAction" style="font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; border-radius: 3px; background: #fff; margin: 0; border: 1px solid #e9e9e9;"> <tr style="font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"> <td class="content-wrap" style="font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 20px;" valign="top"> <meta itemprop="name" content="Confirm Email" style="font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"/> <table width="100%" cellpadding="0" cellspacing="0" style="font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"> <tr style="font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"> <td class="content-block" style="font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top"> Please confirm your subscription by clicking the link below. </td></tr><tr style="font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"> <td class="content-block" style="font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top"> We will send you updates regarding Table Tome only when an important feature is being added to the service. It is important that we have an accurate email address. </td></tr><tr style="font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"> <td class="content-block" itemprop="handler" itemscope itemtype="http://schema.org/HttpActionHandler" style="font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top"> <a href="' + link + '" class="btn-primary" itemprop="url" style="font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; color: #FFF; text-decoration: none; line-height: 2; font-weight: bold; text-align: center; cursor: pointer; display: inline-block; border-radius: 5px; text-transform: capitalize; background: #348eda; margin: 0; border-color: #348eda; border-style: solid; border-width: 10px 20px;">Confirm subscription!</a> </td></tr><tr style="font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"> <td class="content-block" style="font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top"> &mdash; Table Tome </td></tr></table> </td></tr></table> <div class="footer" style="font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; clear: both; color: #999; margin: 0; padding: 20px;"> <table width="100%" style="font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"> <tr style="font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"> <td class="aligncenter content-block" style="font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 12px; vertical-align: top; text-align: center; margin: 0; padding: 0 0 20px;" align="center" valign="top"> Watch <a href="https://github.com/jonwrona/Table-Tome" style="font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 12px; color: #999; text-decoration: underline; margin: 0;">Table Tome</a> on Github. <br>Check out <a href="http://rcos.rpi.edu/" style="font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 12px; color: #999; text-decoration: underline; margin: 0;">RCOS</a>. </td></tr></table> </div></div></td><td style="font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;" valign="top"></td></tr></table></body></html>'
                                }
                                mailgun.messages().send(data, function(err, body) {
                                    if (err) {
                                        return res.json({
                                            success: false,
                                            message: 'The verification email could not be sent.'
                                        });
                                    } else {
                                        return res.json({
                                            success: true
                                        });
                                    }
                                });
                            }
                        });
                }
            });

        });

    apiRouter.get('/mail/validate/:mail', function(req, res) {
        mailgun.lists('updates@mail.tabletome.com')
            .members(req.params.mail).info(function(err, body) {
                if (body.member && body.member.subscribed) {
                    res.redirect("/mail/failure");
                } else if (body.member) {
                    mailgun.lists('updates@mail.tabletome.com')
                        .members(req.params.mail).update({
                            "subscribed": "true"
                        }, function(err, body) {
                            if (err) {
                                res.redirect("/mail/failure");
                                console.log(err);
                            } else {
                                res.redirect("/mail/success")
                            };
                        });
                } else {
                    var members = [{
                        address: req.params.mail
                    }];
                    mailgun.lists('updates@mail.tabletome.com')
                        .members().add({
                            members: members,
                            subscribed: true
                        }, function(err, body) {
                            console.log(body);
                            if (err) {
                                res.redirect("/mail/failure");
                            } else {
                                res.redirect("/mail/success");
                            }
                        });
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

    return apiRouter;

};
