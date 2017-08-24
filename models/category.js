'use strict';

module.exports = function(sequelize, DataTypes) {
  var category = sequelize.define('category', {
    // idCategory: {
    //     allowNull: false,
    //     autoIncrement: true,
    //     primaryKey: true,
    //     type: DataTypes.INTEGER
    // },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  })

  category.associate = function(models) {
    // associations can be defined here
    category.hasMany(models.recipeCategory);        
  }

  return category;
};
