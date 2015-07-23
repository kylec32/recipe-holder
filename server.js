// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var logger = require('morgan');
var path = require('path');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/recipeholder', function(err) {
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});

var something = require('./models/Recipe.js');

// configure app
app.use(logger('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

var recipes = require('./routes/recipes');
app.use('/api/recipes',recipes);

router.get('/', function(req, res) {
  res.json({
    message: 'Welcome to the api!'
  });
});

app.use('/api', router);

app.use(express.static(path.join(__dirname, 'public')));

// START THE SERVER
// =============================================================================

var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";

app.listen(port, ipaddress, function() {
  console.log('Magic happens on port ' + port);
});