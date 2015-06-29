module.exports = function(app, express) {

    var userRouter = express.Router();

    userRouter.use(function(req, res, next) {
        next();
    });

    userRouter.get('/', function(req, res) {
        res.json({
            message: 'welcome to the tabletome user routes.'
        });
    });

    return userRouter;

}