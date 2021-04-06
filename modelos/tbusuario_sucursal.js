const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbusuario_sucursal', {
    usuariosuc_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    usuariosuc_uid: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    usuariosuc_nombre: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    usuariosuc_apellido: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    usuariosuc_sts: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    usuariosuc_ope1: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    usuariosuc_ope2: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    sucursal_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tbsucursal',
        key: 'sucursal_id'
      }
    },
    tbusuario_sucursalcol: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tbusuario_sucursal',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "usuariosuc_id" },
        ]
      },
      {
        name: "SUCURSAL_ID",
        using: "BTREE",
        fields: [
          { name: "sucursal_id" },
        ]
      },
    ]
  });
};
