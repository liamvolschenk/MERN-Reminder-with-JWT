//importing JWT to handle user authorization
const jwt = require('jsonwebtoken');

// declaring a 'secret' and session duration
const secret = 'mysecret'
const expiration = '2h';

module.exports = {
	signToken: function ({ name, _id }) {
		const payload = { name, _id };

		return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
	},

	authMiddleware: function (req, res, next) {
		//allows token to be sent via req.body, req.query or headers
		let token = req.query.token || req.headers.authorization || req.body.token;

		//seperate Bearer from the token value
		if (req.headers.authorization) {
			token = token.split(' ').pop().trim();
		}

		//if there is no token, return request object as is
		if (!token) {
			return req;
		}

		try {
			//attaching the user data to request object
			const { data } = jwt.verify(token, secret, { maxAge: expiration });
			req.user = data;
		} catch {
			console.log('Invalid token!');
			return res.status(400).json({ message: 'invalid token!' });
		}

		next();
	},
};
