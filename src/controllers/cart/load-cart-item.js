const { mongooseFindOne } = require('../../modules/mongoose/query');
const response = require('../../modules/response/response');
const index = require('../../index');
const account = require('../../database/schema/mongodb.account.schema');
const cart = require('../../database/schema/mongodb.cart.schema');
const product = require('../../database/schema/mongodb.product.schema');

const loadCartItemController = async(req, res) => {
    const accountId = req.query.account;

    const existedAccount = await mongooseFindOne(account, '_id', accountId);

    if(existedAccount !== null) {
        if(existedAccount.cart !== '') {
            const result = [];

            const existedCart = await mongooseFindOne(cart, '_id', existedAccount.cart);

            if(existedCart !== null) {
                for(let i = 0; i <= existedCart.product.length; i++) {
                    const existedProduct = await mongooseFindOne(product, '_id', existedCart.product[i]);
                    
                    if(existedProduct !== null) {
                        result.push(existedProduct);
                    }

                    if(i === existedCart.product.length - 1) {
                        response(res, index, 'cart', {
                            message: 'load cart item: success',
                            result: result
                        });
                    }

                }                                
            }
        }
        else {
            response(res, index, 'cart', 'load cart item: empty list');
        }
    }
}

module.exports = loadCartItemController;