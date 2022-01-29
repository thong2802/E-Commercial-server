const { mongooseFindOne } = require('../../modules/mongoose/query');
const { mongooseUpdateOnePush } = require('../../modules/mongoose/update');
const response = require('../../modules/response/response');
const index = require('../../index');
const account = require('../../database/schema/mongodb.account.schema');
const product = require('../../database/schema/mongodb.product.schema');
const comment = require('../../database/schema/mongodb.comment.schema');

const postProductCommentController = async(req, res) => {
    const accountId = req.query.account;
    const productId = req.query.product;    
    const productComment = req.body.comment;
    const productSeller = req.body.seller    

    const existedAccount = await mongooseFindOne(account, '_id', accountId);

    if(existedAccount === null) {
        response(res, index, 'product', 'post product comment: account is not existed');
    }
    else {
        const existedProduct = await mongooseFindOne(product, '_id', productId);

        if(existedProduct === null) {
            response(res, index, 'product', 'post product comment: product is not existed');            
        }
        else {
            new comment({
                account: accountId,
                content: productComment,
                seller: productSeller
            }).save(async(err, comment) => {
                await mongooseUpdateOnePush(product, existedProduct, 'comment', comment.id);

                response(res, index, 'product', 'post product comment: success');
            });            
        }
    }
}

module.exports = postProductCommentController;