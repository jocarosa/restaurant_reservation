'use strict';

var mongoose = require('mongoose');
var Schema	 = mongoose.Schema;

var Last = new Schema({
	ultimo: String
	
	});

module.exports = mongoose.model('Last', Last);
