'use strict'

module.exports = function(sequelize, DataTypes) {
  var recipeIngredient = sequelize.define('recipeIngredient', {
    // idCategory: {
    //     allowNull: false,
    //     autoIncrement: true,
    //     primaryKey: true,
    //     type: DataTypes.INTEGER
    // },
    quantity: {
      type: DataTypes.DOUBLE,
      defaultValue: 0
    }
  })

  recipeIngredient.associate = function(models) {
    // associations can be defined here
    recipeIngredient.belongsTo(models.measure,  {as: 'measure', foreignKey: 'measureId', sourceKey: 'id'}),
    recipeIngredient.belongsTo(models.recipe, {as: 'recipe', foreignKey: 'recipeId', sourceKey: 'id'}),
    recipeIngredient.belongsTo(models.ingredient, {as: 'ingredient', foreignKey: 'ingredientId', sourceKey: 'id'})
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
