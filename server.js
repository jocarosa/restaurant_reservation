'use strict';

var express 	= require('express');
var routes		= require('./app/routes/index.js');
var mongoose	= require('mongoose');
var passport	= require('passport');
var session 	= require('express-session')
var MongoStore  = require('connect-mongostore')(session);


var app = express();
require('dotenv').load();
require('./app/config/passport')(passport);

mongoose.connect('mongodb://jocarosa:jocarosa19@ds145325.mlab.com:45325/restaurant');

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));


app.use(session({
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: true,
	store: new MongoStore({    
    'db': 'restaurant'
  }),

   store: new MongoStore({
    url: 'mongodb://jocarosa:jocarosa19@ds145325.mlab.com:45325/restaurant'
  }),
}));

app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});