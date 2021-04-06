const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbbitacora', {
    bitacora_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    bitacora_mov: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    usuariosuc_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tbusuario_sucursal',
        key: 'usuariosuc_id'
      }
    },
    bitacora_fmov: {
      type: DataTypes.DATE,
      allowNull: false
    },
    bitacora_ope1: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    bitacora_ope2: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tbbitacora',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "bitacora_id" },
        ]
      },
      {
        name: "usuariosuc_id",
        using: "BTREE",
        fields: [
          { name: "usuariosuc_id" },
        ]
      },
    ]
  });
};
