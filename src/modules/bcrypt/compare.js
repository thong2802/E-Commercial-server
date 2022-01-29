const { promisify } = require('util');
const bcrypt = require('bcrypt');

const bcryptCompare = async(inputData, existedData) => {
    const compareAsync = promisify(bcrypt.compare).bind(bcrypt);        
    const result = await compareAsync(inputData, existedData);

    return result;
}

module.exports = bcryptCompare;