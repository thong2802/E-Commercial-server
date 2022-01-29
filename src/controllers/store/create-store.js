const { mongooseFindOne } = require('../../modules/mongoose/query');
const { mongooseUpdateOneSet } = require('../../modules/mongoose/update');
const response = require('../../modules/response/response');
const index = require('../../index');
const account = require('../../database/schema/mongodb.account.schema');
const store = require('../../database/schema/mongodb.store.schema');

const createStoreController = async(req, res) => {
    const accountId = req.query.account;
    const storeLogo = req.body.storeLogo;
    const storeName = req.body.storeName;
    const storePhone = req.body.storePhone;
    const storeEmail = req.body.storeEmail;    
    const storeAddress = req.body.storeAddress; 
    
    const existedAccount = await mongooseFindOne(account, '_id', accountId);

    if(existedAccount === null) {
        response(res, index, 'store', 'create store: account is not existed');
    }
    else {
        const existedStore = await mongooseFindOne(store, 'email', storeEmail);

        if(existedStore !== null) {
            response(res, index, 'store', 'create store: email is existed');
        }
        else {
            new store({
                logo: storeLogo,
                name: storeName,
                phone: storePhone,
                email: storeEmail,
                address: storeAddress,
                product: []

            }).save(async(err, store) => {
                await mongooseUpdateOneSet(account, existedAccount, 'store', store.id);
                
                res.cookie('store', store.id);

                response(res, index, 'store', 'create store: success');
            });            
        }
    }            
}

module.exports = createStoreController;