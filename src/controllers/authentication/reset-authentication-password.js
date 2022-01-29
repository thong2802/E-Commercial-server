const { mongooseFindOne } = require('../../modules/mongoose/query');
const { mongooseUpdateOneSet } = require('../../modules/mongoose/update');
const bcryptHash = require('../../modules/bcrypt/hash');
const redisGet = require('../../modules/redis/get');
const response = require('../../modules/response/response');
const index = require('../../index');
const account = require('../../database/schema/mongodb.account.schema');

const resetAuthenticationPasswordController = async(req, res) => {
    const accountEmail = req.body.email;
    const verifyCode = req.body.code;
    const newPassword = req.body.password;

    const correctCode = await redisGet('reset-password-' + accountEmail);

    if(correctCode === null) {
        response(res, index, 'authentication', 'reset authentication password: account is not existed');
    }
    if(correctCode === verifyCode) {
        const existedAccount = await mongooseFindOne(account, 'email', accountEmail);

        const hashNewPassword = await bcryptHash(newPassword, 10);

        await mongooseUpdateOneSet(account, existedAccount, 'password', hashNewPassword);

        response(res, index, 'authentication', 'reset authentication password: success');
    }
}

module.exports = resetAuthenticationPasswordController;