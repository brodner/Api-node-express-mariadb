const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbcliente_credito', {
    clientecred_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    clientecred_dsc: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    clientecred_fcreacion: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    clientecred_monto: {
      type: DataTypes.FLOAT(10,2),
      allowNull: false
    },
    clientecred_cuotas: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "cantidad de cuotas del credito"
    },
    clientecred_fupago: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    clientecred_diapago: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cliente_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tbcliente',
        key: 'cliente_id'
      }
    },
    credito_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tbcredito',
        key: 'credito_id'
      }
    },
    statuscred_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tbcredito_status',
        key: 'statuscred_id'
      }
    },
    tbcliente_creditocol: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    clientecred_saldo: {
      type: DataTypes.FLOAT(10,2),
      allowNull: false
    },
    clientecred_statusmora: {
      type: DataTypes.INTEGER.UNSIGNED.ZEROFILL,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'tbcliente_credito',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "clientecred_id" },
        ]
      },
      {
        name: "cliente_id",
        using: "BTREE",
        fields: [
          { name: "cliente_id" },
        ]
      },
      {
        name: "credito_id",
        using: "BTREE",
        fields: [
          { name: "credito_id" },
        ]
      },
      {
        name: "statuscredito_id",
        using: "BTREE",
        fields: [
          { name: "statuscred_id" },
        ]
      },
    ]
  });
};
