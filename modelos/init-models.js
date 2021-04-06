var DataTypes = require("sequelize").DataTypes;
var _tbbitacora = require("./tbbitacora");
var _tbcliente = require("./tbcliente");
var _tbcliente_credito = require("./tbcliente_credito");
var _tbcredito = require("./tbcredito");
var _tbcredito_cuota = require("./tbcredito_cuota");
var _tbcredito_movimientos = require("./tbcredito_movimientos");
var _tbcredito_status = require("./tbcredito_status");
var _tbstatus_cliente = require("./tbstatus_cliente");
var _tbsucursal = require("./tbsucursal");
var _tbtipo_identificacion = require("./tbtipo_identificacion");
var _tbusuario_sucursal = require("./tbusuario_sucursal");

function initModels(sequelize) {
  var tbbitacora = _tbbitacora(sequelize, DataTypes);
  var tbcliente = _tbcliente(sequelize, DataTypes);
  var tbcliente_credito = _tbcliente_credito(sequelize, DataTypes);
  var tbcredito = _tbcredito(sequelize, DataTypes);
  var tbcredito_cuota = _tbcredito_cuota(sequelize, DataTypes);
  var tbcredito_movimientos = _tbcredito_movimientos(sequelize, DataTypes);
  var tbcredito_status = _tbcredito_status(sequelize, DataTypes);
  var tbstatus_cliente = _tbstatus_cliente(sequelize, DataTypes);
  var tbsucursal = _tbsucursal(sequelize, DataTypes);
  var tbtipo_identificacion = _tbtipo_identificacion(sequelize, DataTypes);
  var tbusuario_sucursal = _tbusuario_sucursal(sequelize, DataTypes);

  tbcliente_credito.belongsTo(tbcliente, { as: "cliente", foreignKey: "cliente_id"});
  tbcliente.hasMany(tbcliente_credito, { as: "tbcliente_creditos", foreignKey: "cliente_id"});
  tbcredito_movimientos.belongsTo(tbcliente_credito, { as: "clientecred", foreignKey: "clientecred_id"});
  tbcliente_credito.hasMany(tbcredito_movimientos, { as: "tbcredito_movimientos", foreignKey: "clientecred_id"});
  tbcliente_credito.belongsTo(tbcredito, { as: "credito", foreignKey: "credito_id"});
  tbcredito.hasMany(tbcliente_credito, { as: "tbcliente_creditos", foreignKey: "credito_id"});
  tbcliente_credito.belongsTo(tbcredito_status, { as: "statuscred", foreignKey: "statuscred_id"});
  tbcredito_status.hasMany(tbcliente_credito, { as: "tbcliente_creditos", foreignKey: "statuscred_id"});
  tbcliente.belongsTo(tbstatus_cliente, { as: "statuscli", foreignKey: "statuscli_id"});
  tbstatus_cliente.hasMany(tbcliente, { as: "tbclientes", foreignKey: "statuscli_id"});
  tbcliente.belongsTo(tbsucursal, { as: "sucursal", foreignKey: "sucursal_id"});
  tbsucursal.hasMany(tbcliente, { as: "tbclientes", foreignKey: "sucursal_id"});
  tbusuario_sucursal.belongsTo(tbsucursal, { as: "sucursal", foreignKey: "sucursal_id"});
  tbsucursal.hasMany(tbusuario_sucursal, { as: "tbusuario_sucursals", foreignKey: "sucursal_id"});
  tbcliente.belongsTo(tbtipo_identificacion, { as: "tipoide", foreignKey: "tipoide_id"});
  tbtipo_identificacion.hasMany(tbcliente, { as: "tbclientes", foreignKey: "tipoide_id"});
  tbbitacora.belongsTo(tbusuario_sucursal, { as: "usuariosuc", foreignKey: "usuariosuc_id"});
  tbusuario_sucursal.hasMany(tbbitacora, { as: "tbbitacoras", foreignKey: "usuariosuc_id"});

  return {
    tbbitacora,
    tbcliente,
    tbcliente_credito,
    tbcredito,
    tbcredito_cuota,
    tbcredito_movimientos,
    tbcredito_status,
    tbstatus_cliente,
    tbsucursal,
    tbtipo_identificacion,
    tbusuario_sucursal,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
