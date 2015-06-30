var jwt = require('jsonwebtoken');
var config = require('../../config');


module.exports = function(app, express) {

    var adminRouter = express.Router();

    adminRouter.use(function(req, res, next) {
    	var token = req.body.token || req.param('token') || req.headers['x-access-token'];
    	if (token) {
    		jwt.verify(token, config.secret, function(err, decoded) {
    			if (err) {
    				return res.status(403).send({
    					success: false,
    					message: 'Failed to authenticate token.'
    				});
    			} else {
    				if (!decoded.verified) {
    					return res.status(403).send({
    						success: false,
    						message: 'User has not yet verified their email.'
    					});
    				} else if (!decoded.admin) {
    					return res.status(403).send({
    						success: false,
    						message: 'User does not have admin rights.'
    					});
    				}
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

    adminRouter.get('/', function(req, res) {
        res.json({
            message: 'welcome to the tabletome admin routes.'
        });
    });

    return adminRouter;
    
}