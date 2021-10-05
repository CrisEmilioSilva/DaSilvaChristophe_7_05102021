const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASENAME, process.env.DATABASEUSERNAME, process.env.DATABASECODE, {
    dialect: "mysql",
    host: "localhost"
});

try {
    sequelize.authenticate();
    console.log('Successful connection to MySQL database!');
  } catch (error) {
    console.error('Failed connection to MySQL database:', error);
  }

  module.exports = sequelize;
