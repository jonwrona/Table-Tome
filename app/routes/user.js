var User = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../../config');
var mailgun = require('mailgun-js')({
    apiKey: config.mailgunKey,
    domain: config.mailgunDomain
});
var password = require('password-generator');

module.exports = function(app, express) {

    var userRouter = express.Router();

    userRouter.get('/verify/:_id', function(req, res) {
        User.findOne({
            _id: req.params._id
        }, function(err, user) {
            if (err) return res.send(err);
            if (!user) {
                return res.json({
                    success: false,
                    message: 'No user with id ' + req.params._id + ' found.'
                });
            }

            user.verified = true;
            user.save(function(err) {
                if (err) {
                    return res.send(err);
                } else {
                    return res.redirect('/verified/' + req.params._id);
                }
            });
        });
    });

    userRouter.route('/getusername')
        .post(function(req, res) {
            User.findOne({
                email: req.body.email
            }).select('username').exec(function(err, user) {
                if (err) throw err;
                if (!user) {
                    res.json({
                        success: false,
                        message: 'Could not find a user with that email address.'
                    });
                } else if (user) {
                    var data = {
                        from: config.mailgunSendAddress,
                        to: req.body.email,
                        subject: "Your Table Tome Username",
                        html: 'Your username for Table Tome is <strong>' + user.username + '</strong>.<br/><br/>Login <a href="https://tabletome.com/login">here</a>.'
                    };
                    mailgun.messages().send(data, function(err, body) {
                        if (err) {
                            return res.json({
                                success: false,
                                message: 'The reminder email could not be sent.'
                            });
                        } else {
                            return res.json({
                                success: true,
                                message: 'A username reminder has been sent to ' + req.body.email + '.'
                            });
                        }
                    });
                }
            })
        });

    userRouter.route('/resetpassword')
        .post(function(req, res) {
            User.findOne({
                email: req.body.email,
                username: req.body.username
            }, function(err, user) {
                if (err) {
                    return res.send(error);
                }
                if (!user) {
                    return res.json({
                        success: false,
                        message: 'No user with username ' + req.body.username + ' and email ' + req.body.email + ' found.'
                    });
                }
                var pass = password(16, false);
                user.password = pass;
                user.save(function(err) {
                    if (err) {
                        return res.send(err);
                    } else {
                        var data = {
                            from: config.mailgunSendAddress,
                            to: req.body.email,
                            subject: "Your Table Tome Password has been Reset",
                            html: 'Your password for Table Tome has been reset to <strong>' + pass + '</strong><br/><br/>Go <a href="https://tabletome.com/login">here</a> and login using your new password, then you can change it to a more desirable page at your account settings page.'
                        };
                        mailgun.messages().send(data, function(err, body) {
                            if (err) {
                                return res.json({
                                    success: false,
                                    message: 'Your password was reset but the email could not be sent! Contact us regarding this problem and we\'ll get it all worked out.'
                                })
                            } else {
                                return res.json({
                                    success: true,
                                    message: 'Your new password has been sent to ' + req.body.email + '.'
                                });
                            }
                        });
                    }

                });
            });
        });


    userRouter.route('/register')
        .post(function(req, res) {
            var user = new User();

            user.username = req.body.username;
            user.email = req.body.email;
            user.password = req.body.password;

            user.save(function(err) {
                if (err) {
                    if (err.code == 11000) {
                        var field = err.err.split('.$')[1];
                        field = field.split(' dup key')[0];
                        field = field.substring(0, field.lastIndexOf('_'));
                        return res.json({
                            success: false,
                            message: 'A user with that ' + field + ' already exists.'
                        });
                    } else {
                        return res.send(err);
                    }
                }
                res.json({
                    success: true,
                    message: 'User created!'
                });
            });
        });

    userRouter.route('/authenticate')
        .post(function(req, res) {
            User.findOne({
                username: req.body.username
            }).select('username email password verified admin').exec(function(err, user) {
                if (err) throw err;
                if (!user) {
                    res.json({
                        success: false,
                        message: 'Login failed. User not found.'
                    });
                } else if (user) {
                    var validPassword = user.comparePassword(req.body.password);
                    if (!validPassword) {
                        res.json({
                            success: false,
                            message: 'Login failed. Incorrect password.'
                        });
                    } else {
                        var token = jwt.sign({
                            username: user.username,
                            email: user.email,
                            verified: user.verified,
                            admin: user.admin
                        }, config.secret, {
                            expiresInMinutes: 1440 // 24 hours = 1440
                        });

                        res.json({
                            success: true,
                            message: 'Login successful.',
                            token: token
                        });
                    }
                }
            });
        });

    userRouter.use(function(req, res, next) {
        var token = req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, config.secret, function(err, decoded) {
                if (err) {
                    return res.status(403).send({
                        success: false,
                        message: 'Failed to authenticate token.'
                    });
                } else {
                    req.decoded = decoded;
                    next();
                }
            })
        } else {
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }
    });

    userRouter.get('/', function(req, res) {
        res.json({
            message: 'welcome to the tabletome user routes.'
        });
    });

    // move below middleware
    userRouter.post('/sendverify', function(req, res) {
        var email = req.body.email;
        User.findOne({
            email: email
        }, function(err, user) {
            if (err) return res.send(err);
            if (!user) {
                return res.json({
                    success: false,
                    message: 'No user with email ' + email + ' found.'
                });
            }

            var data = {
                from: config.mailgunSendAddress,
                to: req.body.email,
                subject: 'Verify Your Table Tome Email',
                html: 'Click <a href="https://' + req.get('host') + '/user/verify/' + user._id + '">here</a> to verify your email.'
            }

            mailgun.messages().send(data, function(err, body) {
                if (err) {
                    return res.json({
                        success: false,
                        message: 'The verification email could not be sent.'
                    });
                } else {
                    return res.json({
                        success: true,
                        message: 'An email has been sent to ' + email + '. Click the link to verify it.'
                    });
                }
            });
        });
    });

    userRouter.post('/reauth', function(req, res) {
        var username = req.decoded.username;
        User.findOne({
            username: username
        }).select('password').exec(function(err, user) {
            if (err) {
                return res.send(err);
            }
            if (!user) {
                return res.json({
                    success: false,
                    message: 'No user with username ' + username + 'found.'
                });
            }
            var validPassword = user.comparePassword(req.body.password);
            console.log(validPassword);
            if (!validPassword) {
                return res.json({
                    success: false,
                    message: 'Reauthentication password is incorrect.'
                });
            }
            res.json({
                success: true,
                message: 'Reauthentication was successful.'
            });
        });
    });

    userRouter.put('/update', function(req, res) {
        var username = req.decoded.username;
        User.findOne({
            username: username
        }, function(err, user) {
            if (err) {
                return res.send(err);
            }
            if (!user) {
                return res.json({
                    success: false,
                    message: 'No user with username ' + username + ' found.'
                });
            }

            // change account details
            if (req.body.password) user.password = req.body.password;

            // update account
            if (req.body.validated) user.verified = req.body.validated;
            if (req.body.admin) user.admin = req.body.admin;

            // save updated user
            user.save(function(err) {
                console.log(err);
                if (err) {
                    if (err.code == 11000) {
                        var field = err.err.split('.$')[1];
                        field = field.split(' dup key')[0];
                        field = field.substring(0, field.lastIndexOf('_'));
                        return res.json({
                            success: false,
                            message: 'A user with that ' + field + ' already exists.'
                        });
                    } else {
                        return res.send(err);
                    }
                }
                res.json({
                    success: true,
                    message: 'User updated!'
                });
            });
        });
    });



    userRouter.get('/me', function(req, res) {
        res.send(req.decoded);
    });

    return userRouter;

}
