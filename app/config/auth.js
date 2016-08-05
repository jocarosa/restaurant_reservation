'use strict';

module.exports = {
	'githubAuth': {
		'clientID': process.env.GITHUB_KEY,
		'clientSecret': process.env.GITHUB_SECRET,
		'callbackURL': process.env.APP_URL + 'auth/github/callback'
	},
	'facebookAuth' : {
        'clientID'      : '246983182331445', // your App ID
        'clientSecret'  : '6ef898d18cd96577b154d48a78c59da2', // your App Secret
        'callbackURL'   : 'https://hotel-jocarosa.c9users.io/auth/facebook/callback'
    }
};
