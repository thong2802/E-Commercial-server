const { mongooseFindOne } = require('../../modules/mongoose/query');
const { mongooseUpdateOnePush, mongooseUpdateOneSet } = require('../../modules/mongoose/update');
const response = require('../../modules/response/response');
const index = require('../../index');
const account = require('../../database/schema/mongodb.account.schema');
const product = require('../../database/schema/mongodb.product.schema');
const cart = require('../../database/schema/mongodb.cart.schema');

const addCartItemController = async(req, res) => {
    const accountId = req.query.account;
    const productId = req.query.product;
    
    const existedAccount = await mongooseFindOne(account, '_id', accountId);

    if(existedAccount === null) {
        response(res, index, 'cart', 'add cart item: account is not existed');
    }
    else {        
        if(existedAccount.cart !== '') {
            const existedCart = await mongooseFindOne(cart, '_id', existedAccount.cart);

            if(existedCart.product.length > 0) {
                existedCart.product.map(async(item) => {
                    if(productId === item) {
                        response(res, index, 'cart', 'add cart item: existed item');
                    }
                    else {
                        await mongooseUpdateOnePush(cart, existedCart, 'product', productId);                        
                    }
                });
            }
            else {
                await mongooseUpdateOnePush(cart, existedCart, 'product', productId);
            }
            
            response(res, index, 'cart', 'add cart item: success');
        }
        else {
            new cart({
                product: [productId]
            }).save(async(err, cart) => {
                await mongooseUpdateOneSet(account, existedAccount, 'cart', cart.id);

                response(res, index, 'cart', 'add cart item: success');
            });
        }        
    }
}

module.exports = addCartItemController;