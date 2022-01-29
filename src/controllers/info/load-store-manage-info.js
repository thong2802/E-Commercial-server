const { mongooseFindOne } = require('../../modules/mongoose/query');
const response = require('../../modules/response/response');
const index = require('../../index');
const store = require('../../database/schema/mongodb.store.schema');

const loadStoreManageInfoController = async(req, res) => {
    const storeId = req.query.store;

    const storeInfo = await mongooseFindOne(store, '_id', storeId);

    if(storeInfo === null) {
        response(res, index, 'info', 'load store manage info: store is not existed');
    }
    else {
        response(res, index, 'info', { 
            message: 'load store manage info: success',
            result: storeInfo 
        });
    }
}

module.exports = loadStoreManageInfoController;