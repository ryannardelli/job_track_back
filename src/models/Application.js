const Application = sequelize.define("Application", {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  company: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  position: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  vacancyUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  status: {
    type: DataTypes.ENUM(
      "WISHLIST",
      "APPLIED",
      "INTERVIEW",
      "OFFER",
      "REJECTED"
    ),
    defaultValue: "WISHLIST",
  },

  applicationDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },

  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "users",
      key: "uuid",
    },
  },
}, {
  tableName: "applications",
  freezeTableName: true,
  timestamps: true,
});