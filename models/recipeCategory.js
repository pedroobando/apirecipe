'use strict'

module.exports = function(sequelize, DataTypes) {
  var recipeCategory = sequelize.define('recipeCategory', {
    // idCategory: {
    //     allowNull: false,
    //     autoIncrement: true,
    //     primaryKey: true,
    //     type: DataTypes.INTEGER
    // },
  })

  recipeCategory.associate = function(models) {
    // associations can be defined here
    // recipeCategory.hasMany(models.product);
    recipeCategory.belongsTo(models.recipe, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });

    recipeCategory.belongsTo(models.category, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  }

  return recipeCategory;
};
