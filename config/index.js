const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

module.exports = {
  rootPathStatic: path.join(__dirname, '../public'),
  MONGOOSE_URL_DB:
    'mongodb+srv://storeGG:bZEtmoyMyoDB6j2E@cluster0.lansrfy.mongodb.net/Store-Item?retryWrites=true&w=majority',
  PORT: process.env.port || 4000,
  jwtKey: 'SECRET',
};
