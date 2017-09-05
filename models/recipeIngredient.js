'use strict'

module.exports = function(sequelize, DataTypes) {
  var recipeIngredient = sequelize.define('recipeIngredient', {
    // idCategory: {
    //     allowNull: false,
    //     autoIncrement: true,
    //     primaryKey: true,
    //     type: DataTypes.INTEGER
    // },
  })

  recipeIngredient.associate = function(models) {
    // associations can be defined here
    recipeIngredient.belongsTo(models.recipe, {as: 'recipe', foreignKey: 'recipeId'}),
    recipeIngredient.belongsTo(models.ingredient, {as: 'ingredient', foreignKey: 'ingredientId'}) 
    // recipeCategory.hasMany(models.product);
    // recipeIngredient.belongsTo(models.recipe, {
    //   onDelete: "CASCADE",
    //   foreignKey: {
    //     allowNull: false
    //   }
    // })
  }

  return recipeIngredient
}
