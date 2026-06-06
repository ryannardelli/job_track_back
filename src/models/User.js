const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const User = sequelize.define("User", {
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [2, 100],
                msg: "O nome precisa ter pelo menos 2 letras e no máximo 100."
            }
        }
    },

    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: {
                msg: "O e-mail deve ser válido."
            }
        }
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: "users",
    freezeTableName: true,
    timestamps: true
});

module.exports = User;