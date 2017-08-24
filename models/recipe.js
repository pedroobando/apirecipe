'use strict';

module.exports = function recipef(sequelize, DataTypes) {
  var recipe = sequelize.define('recipe', {
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
    difficulty: {
    	type: DataTypes.INTEGER,
    	defaultValue: 0
    },
    portion: {
    	type: DataTypes.INTEGER,
    	defaultValue: 0
    },
    preparation: {
    	type: DataTypes.TEXT
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  })

  recipe.associate = function(models) {
    // associations can be defined here
    recipe.hasMany(models.recipeCategory);
  }

  return recipe;
};