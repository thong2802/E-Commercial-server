const { mongooseFindOne } = require('../../modules/mongoose/query');
const { mongooseUpdateOnePull } = require('../../modules/mongoose/update');
const mongooseDeleteOne = require('../../modules/mongoose/delete');
const response = require('../../modules/response/response');
const index = require('../../index');
const account = require('../../database/schema/mongodb.account.schema');
const order = require('../../database/schema/mongodb.order.schema');
const product = require('../../database/schema/mongodb.product.schema');

const loadOrderListController = async(req, res) => {
    const accountId = req.query.account;

    const existedAccount = await mongooseFindOne(account, '_id', accountId);

    if(existedAccount !== null) {
        const result = [];

        for(let i = 0; i <= existedAccount.order.length; i++) {
            const existedOrder = await mongooseFindOne(order, '_id', existedAccount.order[i]);
            
            if(existedOrder !== null) {
                const existedProduct = await mongooseFindOne(product, '_id', existedOrder.product);
                
                if(existedProduct === null) {
                    await mongooseUpdateOnePull(account, existedAccount, 'order', existedOrder._id);

                    await mongooseDeleteOne(order, existedOrder);

                    response(res, index, 'order', 'load order list: empty');
                }
                else {
                    const detail = {
                        order: existedOrder,
                        product: existedProduct
                    }

                    result.push(detail);

                    if(result.length === existedAccount.order.length) {
                        response(res, index, 'order', {
                            message: 'load order list: success',
                            result: result
                        });
                    }
                }
            }            
            
        }
    }
    
}

module.exports = loadOrderListController;