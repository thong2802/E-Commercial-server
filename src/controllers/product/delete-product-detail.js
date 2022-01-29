const { mongooseFindOne } = require('../../modules/mongoose/query');
const { mongooseUpdateOnePull, mongooseUpdateOneSet } = require('../../modules/mongoose/update');
const response = require('../../modules/response/response');
const index = require('../../index');
const product = require('../../database/schema/mongodb.product.schema');

const deleteProductDetailController = async(req, res) => {
    const productId = req.query.product;
    const queryField = req.query.field;
    const queryWhere = req.query.where;

    const existedProduct = await mongooseFindOne(product, '_id', productId);

    if(existedProduct === null) {
        response(res, index, 'product', 'delete product detail: product is not existed');
    }
    else {        
        switch(queryField) {
            case 'file': await mongooseUpdateOnePull(product, existedProduct, queryField, existedProduct.file[queryWhere]);
            case 'category': await mongooseUpdateOnePull(product, existedProduct, queryField, existedProduct.category[queryWhere]);
            case 'option': await mongooseUpdateOnePull(product, existedProduct, queryField, existedProduct.option[queryWhere]);
            case 'description': await mongooseUpdateOneSet(product, existedProduct, queryField, '');
        }                

        response(res, index, 'product', 'delete product detail: success');
    }
}

module.exports = deleteProductDetailController;