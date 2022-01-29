const { mongooseFindOne } = require('../../modules/mongoose/query');
const { mongooseUpdateOnePush } = require('../../modules/mongoose/update');
const response = require('../../modules/response/response');
const index = require('../../index');
const store = require('../../database/schema/mongodb.store.schema');
const product = require('../../database/schema/mongodb.product.schema');

const postProductDetailController = async(req, res) => {
    const storeId = req.query.store;
    const postTime = req.body.postTime;
    const productName = req.body.productName;
    const productCategory = req.body.productCategory;
    const productFile = req.body.productFile;
    const productOption = req.body.productOption;
    const productPrice = req.body.productPrice; 
    const productQuantity = req.body.productQuantity;
    const productDescription = req.body.productDescription;
    const productAddress = req.body.productAddress;

    const existedStore = await mongooseFindOne(store, '_id', storeId);

    if(existedStore === null) {
        response(res, index, 'product', 'post product detail: store is not existed');
    }
    else {
        new product({
            time: postTime,
            name: productName,
            category: productCategory,
            file: productFile,
            option: productOption,
            price: productPrice,
            quantity: productQuantity,
            description: productDescription,
            address: productAddress,
            discount: 0,
            comment: []
        }).save(async(err, product) => {
            await mongooseUpdateOnePush(store, existedStore, 'product', product.id);

            response(res, index, 'product', 'post product detail: success');
        });                                   
    }
}

module.exports = postProductDetailController;