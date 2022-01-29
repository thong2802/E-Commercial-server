const { promisify } = require('util');

const mongooseUpdateOneSet = async(db, index, key, value) => {
    const updateAsync = promisify(db.updateOne).bind(db);        
    const result = await updateAsync(index, { $set: { [`${key}`]: value } });

    return result;
}

const mongooseUpdateOnePush = async(db, index, key, value) => {
    const updateAsync = promisify(db.updateOne).bind(db);        
    const result = await updateAsync(index, { $push: { [`${key}`]: value } });

    return result;
}

const mongooseUpdateOnePull = async(db, index, key, value) => {
    const updateAsync = promisify(db.updateOne).bind(db);        
    const result = await updateAsync(index, { $pull: { [`${key}`]: value } });

    return result;
}

module.exports = { mongooseUpdateOneSet, mongooseUpdateOnePush, mongooseUpdateOnePull };