const jwt = require('jwt-simple');
const moment = require('moment');

// token with password
const secret = 'secret2023';

// the jwt-simple encodes and decodes user tokens
// validity time limit

exports.createToken = function (user) {
    let payload = {
        sub: user._id,
        name: user.name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
        // creation date
        iat: moment().unix(),
        // expiration date
        exp: moment().add(1, 'hour').unix(),
    };
    return jwt.encode(payload, secret);
};
