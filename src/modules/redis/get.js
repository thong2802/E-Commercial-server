const { promisify } = require('util');
const index = require('../../index');

const redisGet = async(key) => {
    const getAsync = promisify(index.clientRedis.get).bind(index.clientRedis);        
    const value = await getAsync(key);
    
    return value;
}

module.exports = redisGet;