const fs = require('fs');

const configHandler = (req, res) => {
    const configData = JSON.parse(fs.readFileSync('./config/api-config.json'));
    res.send(configData);
}

module.exports = configHandler;