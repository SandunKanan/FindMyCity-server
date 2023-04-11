require("dotenv").config();

module.exports = {
  client: 'mysql2',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: process.env.PASSWORD,
    database: 'capstone',
    charset: 'utf8',
  },
};
