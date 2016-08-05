'use strict';

var mongoose = require('mongoose');
var Schema	 = mongoose.Schema;

var User = new Schema({
	facebook: {
		  id: String,
		name: String
      }
});

module.exports = mongoose.model('User', User);
