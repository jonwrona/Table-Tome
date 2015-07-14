var User = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../../config');

module.exports = function(app, express) {

    var userRouter = express.Router();

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

    userRouter.post('/reauth', function(req, res) {
        var username = req.decoded.username;
        User.findOne({
            username: username
        }).select('password').exec(function(err, user) {
            if (err) {
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
                return res.json({
                    success: false,
                    message: 'No user with username ' + username + 'found.'
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
