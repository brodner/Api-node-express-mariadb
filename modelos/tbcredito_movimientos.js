const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbcredito_movimientos', {
    creditomovs_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    creditomovs_fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    creditomovs_monto: {
      type: DataTypes.FLOAT(10,2),
      allowNull: false
    },
    clientecred_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tbcliente_credito',
        key: 'clientecred_id'
      }
    },
    creditomovs_ope1: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    creditomovs_ope2: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tbcredito_movimientos',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "creditomovs_id" },
        ]
      },
      {
        name: "clientecred_id",
        using: "BTREE",
        fields: [
          { name: "clientecred_id" },
        ]
      },
    ]
  });
};
