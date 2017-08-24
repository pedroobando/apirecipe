"use strict"

module.exports = function(sequelize, DataTypes) {
  var measure = sequelize.define('measure', {
    // idProduct: {
    //   allowNull: false,
    //   autoIncrement: true,
    //   primaryKey: true,
    //   type: DataTypes.INTEGER
    // },
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        notNull: true
      }
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  measure.associate = function(models) {
    // associations can be defined here
    // measurement.belongsTo(models.product, {
    //   onDelete: "CASCADE",
    //   foreignKey: {
    //     allowNull: false
    //   }
    // });

  }
  
  return measure;
};
