"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasOne(models.profile, {
        as: "profile",
        foreignKey: {
          name: "idUser",
        },
      });

      //hasMany to product model
      user.hasMany(models.product, {
        as: "products",
        foreignKey: {
          name: "idUser",
        },
      });

      //hasMany association to transaction model
      user.hasMany(models.transaction, {
        as: "buyerTransactions",
        foreignKey: {
          name: "idBuyer",
        },
      });
      user.hasMany(models.transaction, {
        as: "sellerTransactions",
        foreignKey: {
          name: "idSeller",
        },
      });

      //hasMany association to chat model
      user.hasMany(models.chat, {
        as: "senderMessage",
        foreignKey: {
          name: "idSender",
        },
      });
      user.hasMany(models.chat, {
        as: "recipientMessage",
        foreignKey: {
          name: "idRecipient",
        },
      });
    }
  }
  user.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      name: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
