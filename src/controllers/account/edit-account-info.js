const { mongooseFindOne } = require('../../modules/mongoose/query');
const { mongooseUpdateOneSet } = require('../../modules/mongoose/update');
const response = require('../../modules/response/response');
const index = require('../../index');
const account = require('../../database/schema/mongodb.account.schema');

const editAccountInfoController = async(req, res) => {
    const accountId = req.query.account;
    const accountName = req.body.name;
    const accountEmail = req.body.email;
    const accountPhone = req.body.phone;

    const existedAccount = await mongooseFindOne(account, '_id', accountId);

    if(existedAccount === null) {
        response(res, index, 'account', 'edit account info: account is not existed');
    }
    else {
        const key = ['name', 'email', 'phone'];
        const value = [accountName, accountEmail, accountPhone];

        if(accountEmail !== '') {
            const existedEmail = await mongooseFindOne(account, 'email', accountEmail);

            if(existedEmail !== null) {
                response(res, index, 'account', 'edit account info: email is existed');
            }
        }    

        for(let i = 0; i < value.length; i++) {
            if(value[i] !== '') {
                await mongooseUpdateOneSet(account, existedAccount, key[i], value[i]);
            }
        }

        response(res, index, 'account', 'edit account info: success');
    }        
}

module.exports = editAccountInfoController;