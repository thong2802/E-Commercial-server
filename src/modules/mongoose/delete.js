const { promisify } = require('util');

const mongooseDeleteOne = async(db, index) => {
    const deleteAsync = promisify(db.deleteOne).bind(db);        
    const result = await deleteAsync(index);

    return result;
}

module.exports = mongooseDeleteOne;