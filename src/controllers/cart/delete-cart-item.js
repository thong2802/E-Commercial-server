const { mongooseFindOne } = require('../../modules/mongoose/query');
const { mongooseUpdateOnePull } = require('../../modules/mongoose/update');
const response = require('../../modules/response/response');
const index = require('../../index');
const account = require('../../database/schema/mongodb.account.schema');
const cart = require('../../database/schema/mongodb.cart.schema');

const deleteCartItemController = async(req, res) => {
    const accountId = req.query.account;
    const itemId = req.query.item;

    const existedAccount = await mongooseFindOne(account, '_id', accountId);

    if(existedAccount === null) {
        response(res, index, 'cart', 'delete cart item: account is not existed');
    }
    else {
        if(existedAccount.cart !== '') {
            const existedCart = await mongooseFindOne(cart, '_id', existedAccount.cart);

            if(existedCart !== null) {
                await mongooseUpdateOnePull(cart, existedCart, 'product', itemId);

                response(res, index, 'cart', 'delete cart item: sucess');
            }
        }
    }

    
}

module.exports = deleteCartItemController;