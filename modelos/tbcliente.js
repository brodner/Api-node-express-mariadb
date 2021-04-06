const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbcliente', {
    cliente_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cliente_ide: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    cliente_nombre1: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    cliente_ape1: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    cliente_ape2: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    cliente_fcreacion: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    cliente_fnac: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    statuscli_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tbstatus_cliente',
        key: 'statuscli_id'
      }
    },
    sucursal_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tbsucursal',
        key: 'sucursal_id'
      }
    },
    cliente_op1: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    cliente_op2: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    tipoide_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tbtipo_identificacion',
        key: 'tipoide_id'
      }
    }
  }, {
    sequelize,
    tableName: 'tbcliente',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "cliente_id" },
        ]
      },
      {
        name: "status",
        using: "BTREE",
        fields: [
          { name: "statuscli_id" },
        ]
      },
      {
        name: "sucursal",
        using: "BTREE",
        fields: [
          { name: "sucursal_id" },
        ]
      },
      {
        name: "tipo ide",
        using: "BTREE",
        fields: [
          { name: "tipoide_id" },
        ]
      },
    ]
  });
};
