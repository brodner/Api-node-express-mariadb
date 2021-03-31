module.exports = (Sequelize, sequelize) => {
    const Sujeto = Sequelize.define("tbsujeto", {
        id: {
            type: sequelize.UUID,
            defaultValue: sequelize.UUIDV4,
            primaryKey: true
        },
        primerNombre: {
            type: sequelize.STRING(50),
            allowNull: false,
            validate: {
                len: {
                    args: [2, 50],
                    msg: `El campo primer nombre debe contener mas de 2 caracteres y menos a 50`
                },
                notNull: {
                    msg: "EL primer nombre es requerido"
                }
            }
        },
        segundoNombre: {
            type: sequelize.STRING(50),
            allowNull: true,
        },
        primerApellido: {
            type: sequelize.STRING(50),
            allowNull: false,
            validate: {
                len: [2, 50],
                notNull: {
                    msg: "EL primer Apelido es requerido"
                }
            }
        },
        segundoApellido: {
            type: sequelize.STRING(50),
            allowNull: true,
            validate: {
                len: {
                    args: [0, 50],
                    msg:"Debe ser menor a 50"
                },
            }
        },
        fechaNacimiento: {
            type: sequelize.DATEONLY,
            allowNull: false,
            validate: {
                isDate: {
                    msg: "Ingresa una fecha con formato YYYY/MM/DD"
                },
            }
        },
        fechaCreacion: {
            type: sequelize.DATE(6),
            defaultValue: sequelize.NOW,
        }
    })
    return Sujeto;
}