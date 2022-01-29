const { mongooseFindOne } = require('../../modules/mongoose/query');
const { mongooseUpdateOneSet } = require('../../modules/mongoose/update');
const response = require('../../modules/response/response');
const index = require('../../index');
const store = require('../../database/schema/mongodb.store.schema');

const editStoreInfoController = async(req, res) => {
    const storeId = await mongooseFindOne(store, '_id', req.query.store);

    const key = ['name', 'email', 'phone', 'address'];
    const value = [req.body.name, req.body.email, req.body.phone, req.body.address];    

    if(storeId === null) {
        response(res, index, 'store', 'edit store info: store is not existed');
    }
    else {
        if(value[1] !== '') {
            const existedEmail = await mongooseFindOne(store, 'email', value[1]);

            if(existedEmail !== null) {
                response(res, index, 'store', 'edit store info: email is existed');
            }
        }    

        for(let i = 0; i < value.length; i++) {
            if(value[i] !== '') {
                await mongooseUpdateOneSet(store, storeId, key[i], value[i]);
            }
        }

        response(res, index, 'store', 'edit store info: success');
    }        
}

module.exports = editStoreInfoController;