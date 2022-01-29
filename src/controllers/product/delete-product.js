const { mongooseFindOne, mongooseFindMany, mongooseFindInArray } = require('../../modules/mongoose/query');
const { mongooseUpdateOnePull } = require('../../modules/mongoose/update');
const mongooseDeleteOne = require('../../modules/mongoose/delete');
const response = require('../../modules/response/response');
const index = require('../../index');
const account = require('../../database/schema/mongodb.account.schema');
const store = require('../../database/schema/mongodb.store.schema');
const product = require('../../database/schema/mongodb.product.schema');
const order = require('../../database/schema/mongodb.order.schema');
const cart = require('../../database/schema/mongodb.cart.schema');
const comment = require('../../database/schema/mongodb.comment.schema');

const deleteProductController = async(req, res) => {
    const storeId = req.query.store;
    const productId = req.query.product;

    const existedProduct = await mongooseFindOne(product, '_id', productId);    

    if(existedProduct === null) {
        response(res, index, 'product', 'delete product: product is not existed');
    }
    else {
        const existedStore = await mongooseFindOne(store, '_id', storeId);

        if(existedStore === null) {
            response(res, index, 'product', 'delete product: store is not existed');
        }
        else {
            await mongooseUpdateOnePull(store, existedStore, 'product', productId);

            if(existedProduct.comment.length > 0) {
                for(let i = 0; i <= existedProduct.comment.length; i++) {
                    const existedComment = await mongooseFindOne(comment, '_id', existedProduct.comment[i]);

                    if(existedComment !== null) {
                        await mongooseDeleteOne(comment, existedComment);                    
                    }

                    if(i === existedProduct.comment.length - 1) {
                        const existedCart = await mongooseFindInArray(cart, 'product', productId);

                        if(existedCart !== null) {
                            for(let i = 0; i <= existedCart.length; i++) {
                                await mongooseUpdateOnePull(cart, existedCart[i], 'product', productId);

                                if(i === existedCart.length -1 ) {
                                    await mongooseDeleteOne(product, existedProduct);

                                    response(res, index, 'product', 'delete product: success');
                                }
                            }
                        }
                        else {
                            await mongooseDeleteOne(product, existedProduct);

                            response(res, index, 'product', 'delete product: success');
                        }
                    }
                }
            }
            else {
                await mongooseDeleteOne(product, existedProduct);

                response(res, index, 'product', 'delete product: success');
            }                   
        }                       
    }
}

module.exports = deleteProductController;