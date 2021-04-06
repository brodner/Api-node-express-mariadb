const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbsucursal', {
    sucursal_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    sucursal_nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    sucursal_dsc: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    sucursal_status: {
      type: DataTypes.INTEGER.UNSIGNED.ZEROFILL,
      allowNull: false
    },
    sucursal_token: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: "A"
    }
  }, {
    sequelize,
    tableName: 'tbsucursal',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "sucursal_id" },
        ]
      },
    ]
  });
};
