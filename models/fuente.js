module.exports = (Sequelize, sequelize) => {
    const Fuentes = Sequelize.define("tbfuente", {
        origen: {
            type: sequelize.STRING(20),
            allowNull: false,
        },
        fechaCreacion: {
            type: sequelize.DATE(6),
            defaultValue: sequelize.NOW,
        }
    })
    return Fuentes
}