require('dotenv').config();

const dbUrl = process.env.DATABASE_URL;
const secretKey = process.env.SECRET_KEY;
const apiKey = process.env.API_KEY;

console.log('Database URL:', dbUrl);
console.log('Secret Key:', secretKey);
console.log('API Key:', apiKey);

const { dbUrl, secretKey, apiKey } = require('./config');

console.log('Database URL:', dbUrl);
console.log('Secret Key:', secretKey);
console.log('API Key:', apiKey);
