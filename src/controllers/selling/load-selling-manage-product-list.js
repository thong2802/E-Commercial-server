const { mongooseFindMany, mongooseFindOne, mongooseLiveSearch } = require('../../modules/mongoose/query');
const response = require('../../modules/response/response');
const index = require('../../index');
const store = require('../../database/schema/mongodb.store.schema');
const product = require('../../database/schema/mongodb.product.schema');
const order = require('../../database/schema/mongodb.order.schema');

const loadSellingManageProductListController = async(req, res) => {
    const storeId = req.query.store;

    const existedStore = await mongooseFindOne(store, '_id', storeId);

    if(existedStore === null) {
        response(res, index, 'product', 'load selling manage product list: store is not existed');
    }
    else {
        const result = [];

        if(existedStore.product.length > 0) {
            for(let i = 0; i <= existedStore.product.length; i++) {
                const existedProduct = await mongooseFindOne(product, '_id', existedStore.product[i]);

                if(existedProduct !== null) {
                    const existedOrder = await mongooseFindMany(order, 'product', existedProduct._id);

                    const detail = {
                        product: existedProduct,
                        order: existedOrder
                    }

                    result.push(detail);                    
                }

                if(result.length === existedStore.product.length) {
                    response(res, index, 'product', { 
                        message: 'load selling manage product list: success',
                        result: result 
                    });
                }
            }
        }
        else {
            response(res, index, 'product', 'load selling manage product list: empty list');
        }
    }
}

module.exports = loadSellingManageProductListController;