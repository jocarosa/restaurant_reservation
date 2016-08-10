'use strict';

module.exports = {
	'githubAuth': {
		'clientID': process.env.GITHUB_KEY,
		'clientSecret': process.env.GITHUB_SECRET,
		'callbackURL': process.env.APP_URL + 'auth/github/callback'
	},
	'facebookAuth' : {
        'clientID'      : '246983182331445', // your App ID
        'clientSecret'  : 'dfae31ddd89b5c2f68196999b686d94a', // your App Secret
        'callbackURL'   : 'https://restaurant-reservation.herokuapp.com/auth/facebook/callback'
    }
};
