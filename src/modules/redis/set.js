const index = require('../../index');

const redisSet = (key, value) => {
    index.clientRedis
    .on('connect', (error) => { console.log(error) })
    .set(key, value);

    setTimeout(() => { index.clientRedis.del(key) }, 300000);
}

module.exports = redisSet;