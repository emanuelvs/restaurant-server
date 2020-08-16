const jsonwebtoken = require('jsonwebtoken');

exports.generate = function(user) {
    return jsonwebtoken.sign(user, config.secretKey, {
        expiresIn: 3600
    });
}