'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Comment.belongsTo(models.User,{
        foreignKey: {
        allowNull: false
        }
      }),
      models.Comment.belongsTo(models.Message,{
        foreignKey: {
        allowNull: false
        }
      })
      
      /*models.User.belongsToMany(models.Message,{
        through: models.Like,
        foreignKey: 'userID',
        otherKey: 'messageId',
      });

      models.Message.belongsToMany(models.User,{
        through: models.Like,
        foreignKey: 'messageId',
        otherKey: 'userID',
      }); 

      models.Like.belongsTo(models.User,{
        foreignKey: 'userID',
        as: 'user'
      });

      models.Like.belongsTo(models.Message,{
        foreignKey: 'messageId',
        as: 'message',
      });*/
    }
  };
  Like.init({
  /*  messageId: { 
    type: DataTypes.INTEGER,
    references: {
      model: 'Message',
      key: 'id'
    }
  },

  userID: {
    type: DataTypes.INTEGER,
    references: {
      model: 'User',
      key: 'id'
    }
  }, */
},{
    sequelize,
    modelName: 'Like',
  });
  return Like;
};