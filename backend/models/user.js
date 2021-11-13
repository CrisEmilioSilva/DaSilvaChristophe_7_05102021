'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /*
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
    */
    static associate(models) {
      // define association here
      User.hasMany(models.Message, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      }),
      User.hasMany(models.Comment, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      }),
      User.hasMany(models.Like, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      })
    }
  };
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    job: DataTypes.STRING,
    bio: DataTypes.STRING,
    imageProfileUrl: DataTypes.STRING,
    admin: DataTypes.BOOLEAN,
    userAccountBlock: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};