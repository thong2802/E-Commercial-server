const { mongooseFindOne } = require('../../modules/mongoose/query');
const redisSet = require('../../modules/redis/set');
const resetPasswordMail = require('../../modules/mailer/send');
const response = require('../../modules/response/response');
const index = require('../../index');
const account = require('../../database/schema/mongodb.account.schema');

const forgotAuthenticationPasswordController = async(req, res) => {
    const accountEmail = req.body.email;

    const existedAccount = await mongooseFindOne(account, 'email', accountEmail);

    if(existedAccount === null) {
        response(res, index, 'authentication', 'forgot authentication password: account is not existed');
    }
    else { 
        const randNum = Math.floor(Math.random() * (999999 - 111111) + 111111).toString();console.log(randNum);

        const redisKey = 'reset-password-' + accountEmail;
        const redisValue = randNum;

        redisSet(redisKey, redisValue);

        resetPasswordMail(accountEmail, randNum);

        response(res, index, 'authentication', 'forgot authentication password: success');
    }
}

module.exports = forgotAuthenticationPasswordController;