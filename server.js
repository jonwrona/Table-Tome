// BASE SETUP
// ============

// CALL THE PACKAGES
// -------------------
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var config = require('./config');
var path = require('path');
var favicon = require('serve-favicon');
var https = require('https');
var fs = require('fs');

// APP CONFIGURATION
// ===================

// use body parser to grab info from POST requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// configure our app to handle CORS requests
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

// log all requests to the console
app.use(morgan('dev'));

// connect to the database
mongoose.connect(config.database);

// set static files location
app.use(express.static(__dirname + '/public'));

// set favicon
app.use(favicon(__dirname + '/public/assets/img/favicon.ico'));

// ROUTES
// ========

// API ROUTE
// -----------
var basicRoutes = require('./app/routes/basic')(app, express);
app.use('/basic', basicRoutes);

// ADMIT ROUTE
// --------------
var adminRoutes = require('./app/routes/admin')(app, express);
app.use('/admin', adminRoutes);

// USER ROUTE
// -------------
var userRoutes = require('./app/routes/user')(app, express);
app.use('/user', userRoutes);

// MAIN CATCHALL ROUTE
// ---------------------
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});


// START THE SERVER
// ==================

https.createServer({
    pfx: fs.readFileSync(config.certFile),
    passphrase: config.certPass
}, app).listen(config.port);
console.log('server running on port ' + config.port);
