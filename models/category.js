"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // belongs to many products
      category.belongsToMany(models.product, {
        as: "products",
        through: {
          model: "productCategory",
          as: "bridge",
        },
        foreignKey: "idCategory",
      });
    }
  }
  category.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "category",
    }
  );
  return category;
};
