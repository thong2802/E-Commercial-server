const { mongooseFindOne, mongooseFindMany, mongooseFindInArray } = require('../../modules/mongoose/query');
const response = require('../../modules/response/response');
const index = require('../../index');
const account = require('../../database/schema/mongodb.account.schema');
const product = require('../../database/schema/mongodb.product.schema');
const store = require('../../database/schema/mongodb.store.schema');
const comment = require('../../database/schema/mongodb.comment.schema');

const loadProductDetailController = async(req, res) => {    
    const productId = req.query.product;

    const existedProduct = await mongooseFindOne(product, '_id', productId);
    
    if(existedProduct === null) {
        response(res, index, 'product', 'load product detail: empty list');
    }
    else {
        const existedStore = await mongooseFindInArray(store, 'product', productId);

        if(existedStore === null) {
            response(res, index, 'product', 'load product detail: empty list');
        }
        else {
            const commentList = [];

            for(let i = 0; i <= existedProduct.comment.length; i++) {
                const existedComment = await mongooseFindOne(comment, '_id', existedProduct.comment[i]);

                if(existedComment !== null) {
                    const existedAccount = await mongooseFindOne(account, '_id', existedComment.account);

                    if(existedAccount !== null) {
                        const commentDetail = {
                            account: existedAccount,
                            comment: existedComment 
                        }

                        commentList.push(commentDetail);
                    }
                }

                if(commentList.length === existedProduct.comment.length) {
                    response(res,index, 'product', {
                        message: 'load product detail: success',
                        detail: existedProduct,
                        store: existedStore[0],
                        comment: commentList
                    });
                }
            }
        }               
    }    
}

module.exports = loadProductDetailController;