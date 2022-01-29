const response = (res, index, key, value) => {
    return res.status(200).header('Access-Control-Allow-Origin', index.clientUrl).json({ [`${key}`]: value });
}

module.exports = response;