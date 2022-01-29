const { mongooseFindOne } = require('../../modules/mongoose/query');
const mongooseDeleteOne = require('../../modules/mongoose/delete');
const { mongooseUpdateOnePull } = require('../../modules/mongoose/update');
const response = require('../../modules/response/response');
const index = require('../../index');
const account = require('../../database/schema/mongodb.account.schema');
const order = require('../../database/schema/mongodb.order.schema');

const cancelOrderController = async(req, res) => {
    const accountId = req.query.account;
    const orderId = req.query.order;

    const existedAccount = await mongooseFindOne(account, '_id', accountId);

    if(existedAccount === null) {
        response(res, index, 'order', 'cancel order: account is not existed');
    }
    else {
        const existedOrder = await mongooseFindOne(order, '_id', orderId);

        if(existedOrder === null) {
            response(res, index, 'order', 'cancel order: order is not existed');
        }
        else {
            await mongooseDeleteOne(order, existedOrder);

            await mongooseUpdateOnePull(account, existedAccount, 'order', orderId);

            response(res, index, 'order', 'cancel order: success');
        }
    }
}

module.exports = cancelOrderController;