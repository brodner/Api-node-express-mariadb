const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbcredito_cuota', {
    creditocuota_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    clientecred_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    creditocuota_cuota: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    creditocuota_monto1: {
      type: DataTypes.FLOAT(10,2),
      allowNull: false
    },
    creditocuota_fvencimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    creditocuota_sts: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    creditocuota_mmora: {
      type: DataTypes.FLOAT(10,2),
      allowNull: false
    },
    creditocuota_montot: {
      type: DataTypes.FLOAT(10,2),
      allowNull: false
    },
    creditocuota_stsmora: {
      type: DataTypes.STRING(45),
      allowNull: true,
      comment: "si la cuota fue cargada"
    },
    creditocuota_fpago: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    creditocuota_ope1: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    creditocuota_ope2: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    tbcredito_cuotacol: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tbcredito_cuota',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "creditocuota_id" },
        ]
      },
    ]
  });
};
