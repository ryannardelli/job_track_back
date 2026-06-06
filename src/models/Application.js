const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const Application = sequelize.define("Application", {
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },

    company: {
        type: DataTypes.STRING,
        allowNull: false
    },

    position: {
        type: DataTypes.STRING,
        allowNull: false
    },

    status: {
        type: DataTypes.ENUM(
            "WISHLIST",
            "APPLIED",
            "INTERVIEW",
            "OFFER",
            "REJECTED"
        ),
        defaultValue: "WISHLIST"
    },

    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "users",
            key: "uuid"
        }
    }
}, {
    tableName: "applications",
    freezeTableName: true,
    timestamps: true
});

module.exports = Application;