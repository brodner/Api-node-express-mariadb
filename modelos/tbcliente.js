const Sequelize = require('sequelize')
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
      allowNull: false,
      validate: {
        notEmpty: true,
        len: {
          args: [0, 100],
          msg: 'El campo primer nombre debe contener mas de 2 caracteres o menor a 100'
        },
        notNull: {
          msg: 'EL nombre es requerido'
        }
      }
    },
    cliente_ape1: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: {
          args: [2, 100],
          msg: 'El campo primer apellido debe contener mas de 2 caracteres o menor a 100'
        },
        notNull: {
          msg: 'EL primer Apelido es requerido'
        }
      }
    },
    cliente_ape2: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: {
          args: [2, 100],
          msg: 'El campo segundo Apellido debe contener mas de 2 caracteres o menor a 100'
        },
        notNull: {
          msg: 'EL segundo Apelido es requerido'
        }
      }
    },
    cliente_fcreacion: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    cliente_fnac: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: {
          msg: 'Ingresa una fecha con formato YYYY/MM/DD'
        },
        notNull: {
          msg: 'la fecha de nacimiento es requerida'
        }
      }
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
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'cliente_id' }
        ]
      },
      {
        name: 'status',
        using: 'BTREE',
        fields: [
          { name: 'statuscli_id' }
        ]
      },
      {
        name: 'sucursal',
        using: 'BTREE',
        fields: [
          { name: 'sucursal_id' }
        ]
      },
      {
        name: 'tipo ide',
        using: 'BTREE',
        fields: [
          { name: 'tipoide_id' }
        ]
      }
    ]
  })
}
