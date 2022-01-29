const jwt = require('jsonwebtoken');
const index = require('../../index');
const response = require('../../modules/response/response');

const protectController = (req, res, next) => {
    if(!req.headers.cookie) {
        response(res, index, 'protect', 'miss');
    }
    if(req.headers.cookie) {
        const jwtSecret = index.jwtSecret;

        const cookie = req.headers.cookie.split('Bearer%20')[1];
        const token = cookie.split('; ')[0];

        jwt.verify(token, jwtSecret, (err, match) => {
            if(!match) {
                response(res, index, 'protect', 'miss');
            }
            if(match) {
                next();
            }
        });
    }    
    
    return;
}

module.exports = protectController;