const { mongooseFindOne } = require('../../modules/mongoose/query');
const { mongooseUpdateOneSet } = require('../../modules/mongoose/update');
const response = require('../../modules/response/response');
const index = require('../../index');
const account = require('../../database/schema/mongodb.account.schema');

const updateAccountAvatarController = async(req, res) => {
    const accountId = req.query.account;
    const accountAvatar = req.body.avatar;

    const existedAccount = await mongooseFindOne(account, '_id', accountId);

    if(existedAccount === null) {
        response(res, index, 'account', 'update account avatar: account is not existed');
    }
    else {
        await mongooseUpdateOneSet(account, existedAccount, 'avatar', accountAvatar);

        response(res, index, 'account', 'update account avatar: success');
    }    
}


module.exports = updateAccountAvatarController;