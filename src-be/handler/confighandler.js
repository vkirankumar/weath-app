import * as fs from 'fs';

export const configHandler = (_req, res) => {
    const configData = JSON.parse(fs.readFileSync('./config/api-config.json'));
    res.send(configData);
}
