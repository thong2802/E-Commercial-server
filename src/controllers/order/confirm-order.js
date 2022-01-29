const { mongooseFindOne } = require('../../modules/mongoose/query');
const { mongooseUpdateOneSet } = require('../../modules/mongoose/update');
const response = require('../../modules/response/response');
const index = require('../../index');
const order = require('../../database/schema/mongodb.order.schema');

const confirmOrderController = async(req, res) => {
    const orderId = req.query.order;

    const existedOrder = await mongooseFindOne(order, '_id', orderId);

    if(existedOrder === null) {
        response(res, index, 'order', 'confirm order: order is not existed');
    }
    else {
        await mongooseUpdateOneSet(order, existedOrder, 'state', 'confirmed');

        response(res, index, 'order', 'confirm order: success');
    }
}

module.exports = confirmOrderController;