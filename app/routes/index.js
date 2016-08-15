'use strict';
var path			= process.cwd();
var dataHandler 	= require(path+'/app/controllers/datacontroller.js');
var bodyParser		= require('body-parser');
var objHandler		= new dataHandler();

module.exports = function (app, passport) {
	
	app.use(bodyParser.json());	
	bodyParser.urlencoded({ extended: false });
	
	
	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}
	

	
	app.route('/user')
	.get(function(req,res){
		res.json(req.user);
	});

	app.route('/')
	.get(isLoggedIn,function(req,res){
		res.sendFile(path + '/public/index.html');
	})
	.post(objHandler.postapi);
	
	
	app.route('/yelp')
	.get(isLoggedIn,objHandler.yelpapi)
	
	
	app.route('/login')
		.get(function (req, res) {
			res.sendFile(path + '/public/login.html');
		});

	app.route('/logout')
	.get(function (req, res) {
		req.logout();
		res.redirect('/login');
	});




	app.route('/auth/facebook')
	.get(passport.authenticate('facebook', { scope : 'email' }));

	app.route('/auth/facebook/callback')
    .get(passport.authenticate('facebook', {
    	successRedirect : '/'
    })); 

	
};
