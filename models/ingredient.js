"use strict"

module.exports = function(sequelize, DataTypes) {
  var ingredient = sequelize.define('ingredient', {
    // idProduct: {
    //   allowNull: false,
    //   autoIncrement: true,
    //   primaryKey: true,
    //   type: DataTypes.INTEGER
    // },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quantity: {
      type: DataTypes.DOUBLE,
      defaultValue: 0
    },
    price: {
      type: DataTypes.DOUBLE,
      defaultValue: 0
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  ingredient.associate = function(models) {
    // associations can be defined here
    ingredient.belongsTo(models.measure,  {as: 'measure', foreignKey: 'measureId'}) //, {as: 'Measure', foreignKey: 'id'})
    // ingredient.belongsTo(models.recipeIngredient)
  }
  
  return ingredient
}
