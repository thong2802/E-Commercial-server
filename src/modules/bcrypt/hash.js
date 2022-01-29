const { promisify } = require('util');
const bcrypt = require('bcrypt');

const bcryptHash = async(inputData, saltRounds) => {
    const hashAsync = promisify(bcrypt.hash).bind(bcrypt);        
    const result = await hashAsync(inputData, saltRounds);

    return result;
}

module.exports = bcryptHash;