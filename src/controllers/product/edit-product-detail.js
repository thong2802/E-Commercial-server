const { mongooseFindOne } = require('../../modules/mongoose/query');
const { mongooseUpdateOneSet } = require('../../modules/mongoose/update');
const response = require('../../modules/response/response');
const index = require('../../index');
const product = require('../../database/schema/mongodb.product.schema');

const editProductDetailController = async(req, res) => {
    const productId = req.query.product;    
    const productFile = req.body.file;
    const productName = req.body.name;
    const productCategory = req.body.category;
    const productOption = req.body.option;
    const productPrice = req.body.price;
    const productQuantity = req.body.quantity;
    const productDescription = req.body.description;

    const existedProduct = await mongooseFindOne(product, '_id', productId);

    if(existedProduct === null) {
        response(res, index, 'product', 'edit product detail: product is not existed');
    }
    else {
        const key = ['price', 'name', 'quantity', 'description', 'file', 'category', 'option'];
        const value = [productPrice, productName, productQuantity, productDescription, productFile, productCategory, productOption];        

        for(let i = 0; i < 4; i++) {
            if(value[i] !== '') {
                if(i === 0) {
                    if(value[i] < existedProduct.price) {
                        await product.updateOne(existedProduct, { $set: { price: value[i], discount: existedProduct.price - value[i] } });
                    }
                    if(value[i] > existedProduct.price) {
                        await product.updateOne(existedProduct, { $set: { price: value[i], discount: 0 } });
                    }                    
                }                
                else {
                    await mongooseUpdateOneSet(product, existedProduct, key[i], value[i]);                                
                }                
            }                       
        }

        for(let i = 4; i < 7; i++) {            
            if(value[i].length > 0) {
                if(i === 4) {
                    if(value[i].length + existedProduct.category.length > 3) {
                        response(res, index, 'product', 'edit product detail: category length over 3 items');
                    }
                    
                }
                
                await mongooseUpdateOneSet(product, existedProduct, key[i], value[i]);                                                
            }            
        }                

        response(res, index, 'product', 'edit product detail: success');
    }
}

module.exports = editProductDetailController;