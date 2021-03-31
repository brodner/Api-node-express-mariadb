const dbConfig = require("../db.conf.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    },
    define: {
        freezeTableName: true
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.fuentes = require("./fuente.js")(sequelize,Sequelize);
db.estados = require("./estado.js")(sequelize,Sequelize);



db.sujetos = require("./sujeto.js")(sequelize,Sequelize);
db.fuentes.hasMany(db.sujetos);
db.sujetos.belongsTo(db.fuentes);

db.estados.hasMany(db.sujetos);
db.sujetos.belongsTo(db.estados);



module.exports = db;