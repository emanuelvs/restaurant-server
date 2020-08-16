const jsonwebtoken = require('jsonwebtoken');
const { secretKey  } = require('../config');

exports.generate = function(user) {
    return jsonwebtoken.sign(user, secretKey, {
        expiresIn: 3600
    });
}