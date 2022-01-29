const { mongooseLiveSearch } = require('../../modules/mongoose/query');
const response = require('../../modules/response/response');
const index = require('../../index');
const product = require('../../database/schema/mongodb.product.schema');

const loadProductListOnNameController = async(req, res) => {
    const productName = req.body.productName;

    const productListOnName = await mongooseLiveSearch(product, 'name', productName);console.log(productListOnName);

    if(productListOnName !== null) {
        response(res, index, 'product', {
            message: 'success',
            result: productListOnName
        });
    }
}

module.exports = loadProductListOnNameController;