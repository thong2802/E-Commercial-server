const { mongooseLiveSearch } = require('../../modules/mongoose/query');
const response = require('../../modules/response/response');
const index = require('../../index');
const product = require('../../database/schema/mongodb.product.schema');

const searchProductController = async(req, res) => {
    const searchInput = req.body.searchInput;
    
    const result = await mongooseLiveSearch(product, 'name', searchInput);

    if(result !== null) {
        response(res, index, 'product', {
            message: 'live search: success',
            result: result
        });
    }    
}

module.exports = searchProductController;