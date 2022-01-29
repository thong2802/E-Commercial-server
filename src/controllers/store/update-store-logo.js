const { mongooseFindOne } = require('../../modules/mongoose/query');
const { mongooseUpdateOneSet } = require('../../modules/mongoose/update');
const response = require('../../modules/response/response');
const index = require('../../index');
const store = require('../../database/schema/mongodb.store.schema');

const updateStoreLogoController = async(req, res) => {
    const storeId = req.query.store;
    const storeLogo = req.body.logo;

    const existedStore = await mongooseFindOne(store, '_id', storeId);

    if(existedStore === null) {
        response(res, index, 'store', 'update store logo: store is not existed');
    }
    else {
        await mongooseUpdateOneSet(store, existedStore, 'logo', storeLogo);

        response(res, index, 'store', 'update store logo: success');
    }    
}


module.exports = updateStoreLogoController;