'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Busca = new Schema({
		id_user			: String,
	   	noreservados	: Number,
    	id_reservado	: String,
    	activado		: Boolean,
    	hide			: Boolean
});

module.exports = mongoose.model('Busca', Busca);
