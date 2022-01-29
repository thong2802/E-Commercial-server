const { mongooseFindOne } = require('../../modules/mongoose/query');
const bcryptHash = require('../../modules/bcrypt/hash');
const response = require('../../modules/response/response');
const index = require('../../index');
const account = require('../../database/schema/mongodb.account.schema');

const handleRegisterController = async(req, res) => {
    const accountName = req.body.accountName;
    const accountPhone = req.body.accountPhone;
    const accountEmail = req.body.accountEmail;
    const accountPassword = req.body.accountPassword;    

    const existedEmail = await mongooseFindOne(account, 'email', accountEmail);
            
    if(existedEmail !== null) {
        response(res, index, 'register', 'handle register: email is existed');        
    }
    else {
        const existedPhone = await mongooseFindOne(account, 'phone', accountPhone);

        if(existedPhone !== null) {
            response(res, index, 'register', 'handle register: phone is existed');
        }
        else {
            const hashPassword = await bcryptHash(accountPassword, 10);
            
            new account({
                avatar: '',
                name: accountName,
                phone: accountPhone,
                email: accountEmail,
                password: hashPassword,
                store: '',
                cart: '',
                order: []
            }).save();

            response(res, index, 'register', 'handle register: success');
        }
    }
}

module.exports = handleRegisterController;