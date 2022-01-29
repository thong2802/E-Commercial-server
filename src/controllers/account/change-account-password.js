const { mongooseFindOne } = require('../../modules/mongoose/query');
const { mongooseUpdateOneSet } = require('../../modules/mongoose/update');
const bcryptHash = require('../../modules/bcrypt/hash');
const bcryptCompare = require('../../modules/bcrypt/compare');
const response = require('../../modules/response/response');
const index = require('../../index');
const account = require('../../database/schema/mongodb.account.schema');

const changeAccountPasswordController = async(req, res) => {
    const accountId = req.query.account;
    const accountOldPassword = req.body.oldPassword;
    const accountNewPassword = req.body.newPassword;

    const existedAccount = await mongooseFindOne(account, '_id', accountId);

    if(existedAccount === null) {
        response(res, index, 'account', 'change password: account is not existed');
    }
    else {
        const checkOldPassword = await bcryptCompare(accountOldPassword, existedAccount.password);

        if(checkOldPassword === false) {
            response(res, index, 'account', 'change password: old password is wrong');
        }
        else {
            const hashNewPassword = await bcryptHash(accountNewPassword, 10);

            await mongooseUpdateOneSet(account, existedAccount, 'password', hashNewPassword);

            response(res, index, 'account', 'change password: success');
        }
    }
}

module.exports = changeAccountPasswordController;