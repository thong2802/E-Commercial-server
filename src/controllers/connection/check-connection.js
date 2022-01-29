const response = require('../../modules/response/response');
const index = require('../../index');

const checkConnectionController = (req, res) => {
    const checkingMessage = req.query.message;

    if(checkingMessage === 'checking') {
        response(res, index, 'connection', 'success');
    }
}

module.exports = checkConnectionController;