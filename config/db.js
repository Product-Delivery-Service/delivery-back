const sequelize = require("sequelize");
const dbConfig = new sequelize.Sequelize(

  // "delivery",
  // "root",
  // "root",

  "myredatestdb",
  "reda123",
  "Reda12345",

  // "Your_database_name",
  // "Your_user_name",
  // "Your_password",
  {
    // host: "Your_host",
    // host: "localhost",
    host: "db4free.net",
    dialect: "mysql",
    pool: {
      min: 0,
      max: 5,
      acquire: 30000,
      idle: 10000,
    },
    port: 3306,
    logging: false,
  }
);

module.exports = dbConfig
