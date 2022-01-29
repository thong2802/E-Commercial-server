const { mongooseFindOne } = require('../../modules/mongoose/query');
const { mongooseUpdateOnePush } = require('../../modules/mongoose/update');
const response = require('../../modules/response/response');
const index = require('../../index');
const product = require('../../database/schema/mongodb.product.schema');

const addProductDetailController = async(req, res) => {
    const productId = req.query.product;
    const productField = req.query.field;
    const productData = req.body.productData;

    const existedProduct = await mongooseFindOne(product, '_id', productId);

    if(existedProduct === null) {
        response(res, index, 'product', 'add product detail: product is not existed');
    }
    else {
        productData.map(async(item) => {
            if(productField === 'category') {
                if(existedProduct.category.length + productData.length > 3) {
                    response(res, index, 'product', 'add product detail: category length over 3 items');
                }
                else {
                    if(!existedProduct.category.includes(item)) {
                        await mongooseUpdateOnePush(product, existedProduct, productField, item)
                    }
                }                
            }
            if(productField === 'option') {
                await mongooseUpdateOnePush(product, existedProduct, productField, item)
            }
        });
        
        response(res, index, 'product', 'add product detail: success');
    }
}

module.exports = addProductDetailController;