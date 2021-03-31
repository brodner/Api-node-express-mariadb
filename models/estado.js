module.exports = (Sequelize, sequelize) => {
    const Estado = Sequelize.define("tbestado", {
        estado: {
            type: sequelize.STRING(20),
            allowNull: false,
        }
    })
    return Estado;
}