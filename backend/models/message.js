'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /*
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
    */
    static associate(models) {
      // define association here
      Message.belongsTo(models.User),
      Message.hasMany(models.Comment,{
        foreignKey: 'messageId',
        onDelete: 'CASCADE',
      })
      Message.hasMany(models.Like,{
        foreignKey: 'messageId',
        onDelete: 'CASCADE',
      })
    }
  };
  Message.init({
    content: DataTypes.STRING,
    gif: DataTypes.STRING,
    likes: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};