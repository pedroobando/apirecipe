"use strict"

module.exports = function(sequelize, DataTypes) {
  var product = sequelize.define('product', {
    // idProduct: {
    //   allowNull: false,
    //   autoIncrement: true,
    //   primaryKey: true,
    //   type: DataTypes.INTEGER
    // },
    code: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        notNull: true
      }
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        notNull: true
      }
    },
    price: DataTypes.DOUBLE,
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  product.associate = function(models) {
    // associations can be defined here
    product.belongsTo(models.category, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  }
  
  return product;
};
