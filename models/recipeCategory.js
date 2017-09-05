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
    recipeCategory.belongsTo(models.recipe, {as: 'recipe', foreignKey: 'recipeId', sourceKey: 'id'}),
    recipeCategory.belongsTo(models.category, {as: 'category', foreignKey: 'categoryId'})

  }

  return recipeCategory;
};
