const { mongooseFindOne } = require('../../modules/mongoose/query');
const { mongooseUpdateOnePush } = require('../../modules/mongoose/update');
const response = require('../../modules/response/response');
const index = require('../../index');
const account = require('../../database/schema/mongodb.account.schema');
const product = require('../../database/schema/mongodb.product.schema');
const order = require('../../database/schema/mongodb.order.schema');

const postOrderDetailController = async(req, res) => {    
    const accountId = req.query.account;
    const orderTime = req.body.orderTime;
    const orderProduct = req.query.product;   
    const orderName = req.body.orderName;
    const orderPhone = req.body.orderPhone;
    const orderAddress = req.body.orderAddress;
    const orderOption = req.body.orderOption;
    const orderQuantity = req.body.orderQuantity;
    const orderPrice = req.body.orderPrice;
    const orderState = 'waiting';

    const existedAccount = await mongooseFindOne(account, '_id', accountId);

    if(existedAccount === null) {
        response(res, index, 'order', 'post order detail: account is not existed');
    }
    else {
        const existedProduct = await mongooseFindOne(product, '_id', orderProduct);

        if(existedProduct === null) {
            response(res, index, 'order', 'post order detail: product is not existed');
        }
        else {
            new order({
                time: orderTime,
                product: orderProduct,
                name: orderName,
                phone: orderPhone,
                address: orderAddress,
                option: orderOption,
                quantity: orderQuantity,
                price: orderPrice,
                state: orderState
            }).save(async(err, order) => {
                await mongooseUpdateOnePush(account, existedAccount, 'order', order.id);

                response(res, index, 'order', 'post order detail: success');
            });            
        }
    }
}

module.exports = postOrderDetailController;