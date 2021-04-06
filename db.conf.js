module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "tn_udv1",
  dialect: "mariadb",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};