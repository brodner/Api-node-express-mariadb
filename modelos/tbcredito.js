const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbcredito', {
    credito_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    credito_cod: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    credito_dsc: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    credito_mora: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'tbcredito',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "credito_id" },
        ]
      },
    ]
  });
};
