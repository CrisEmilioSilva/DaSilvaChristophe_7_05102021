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
      models.Message.belongsTo(models.User,{
        foreignKey: "userId",
        allowNull: false,
        onDelete: 'cascade',
      }),
      models.Message.hasMany(models.Comment),
      models.Message.hasMany(models.Like)
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