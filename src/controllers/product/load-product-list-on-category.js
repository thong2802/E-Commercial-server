const { mongooseFindInArray } = require('../../modules/mongoose/query');
const response = require('../../modules/response/response');
const index = require('../../index');
const product = require('../../database/schema/mongodb.product.schema');

const loadProductListOnCategoryController = async(req, res) => {
    const productCategory = req.query.category;  

    const productListOnCategory = await mongooseFindInArray(product, 'category', productCategory);

    if(productListOnCategory !== null) {
        response(res, index, 'product', {
            message: 'success',
            result: productListOnCategory
        });
    }
}

module.exports = loadProductListOnCategoryController;