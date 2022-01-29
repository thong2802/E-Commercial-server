const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const jwtSign = async(key, value, secret, time) => {
    const signAsync = promisify(jwt.sign).bind(jwt);    
    const signResult = await signAsync({ [`${key}`]: value }, secret, { expiresIn: time });

    return signResult;
}

module.exports = jwtSign;