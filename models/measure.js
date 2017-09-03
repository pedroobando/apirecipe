'use strict';

module.exports = function(sequelize, DataTypes) {
  var measure = sequelize.define('measure', {
    // idmeasure: {
    //   allowNull: false,
    //   autoIncrement: true,
    //   primaryKey: true,
    //   type: DataTypes.INTEGER
    // },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  measure.associate = function(models) {
    measure.hasMany(models.ingredient, {as: 'ingredient', foreignKey: 'measureId'}) //, {as: 'ingredient', foreignKey: 'id'})
    // associations can be defined here
    // measurement.belongsTo(models.product, {
    //   onDelete: "CASCADE",
    //   foreignKey: {
    //     allowNull: false
    //   }
    // });
  }
  
  return measure
}
