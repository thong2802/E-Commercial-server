const { promisify } = require('util');

const mongooseFindMany = async(db, key, value) => {
    const queryAsync = promisify(db.find).bind(db);        
    const data = await queryAsync({ [`${key}`]: value });

    return data;
}

const mongooseFindOne = async(db, key, value) => {
    const queryAsync = promisify(db.findOne).bind(db);        
    const data = await queryAsync({ [`${key}`]: value });

    return data;
}

const mongooseFindInArray = async(db, key, value) => {
    const queryAsync = promisify(db.find).bind(db);        
    const data = await queryAsync({ [`${key}`]: { $all:  [value] } });

    return data;
}

const mongooseLiveSearch = async(db, key, value) => {
    const queryAsync = promisify(db.find).bind(db);        
    const data = await queryAsync({ [`${key}`]: { $regex: new RegExp(value, 'i') } });

    return data;
}

module.exports = { mongooseFindOne, mongooseFindMany, mongooseFindInArray, mongooseLiveSearch };