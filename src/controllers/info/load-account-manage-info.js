const { mongooseFindOne } = require('../../modules/mongoose/query');
const response = require('../../modules/response/response');
const index = require('../../index');
const account = require('../../database/schema/mongodb.account.schema');

const loadAccountManageInfoController = async(req, res) => {
    const accountId = req.query.account;

    const accountInfo = await mongooseFindOne(account, '_id', accountId);

    if(accountInfo === null) {
        response(res, index, 'info', 'load account manage info: account is not existed');
    }
    else {
        response(res, index, 'info', { 
            message: 'load account manage info: success',
            result: accountInfo 
        });
    }
}

module.exports = loadAccountManageInfoController;