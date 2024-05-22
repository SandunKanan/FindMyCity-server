require("dotenv").config();

module.exports = {
  client: 'mysql2',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: process.env.PASSWORD,
    database: 'findmycity',
    charset: 'utf8',
  },
};

// // knexfile.js
// module.exports = {
//   client: 'mysql2', // or 'mysql' for MySQL
//   connection: {
//     host: process.env.DB_HOST || '/cloudsql/YOUR_INSTANCE_CONNECTION_NAME',
//     user: process.env.DB_USER,
//     password: process.env.PASSWORD,
//     database: process.env.DB_NAME,
//   },
//   migrations: {
//     tableName: 'knex_migrations',
//   },
// };
