const crypto = require("crypto");

const app = require("./app");
const http = require("http");

const sequelize = require("./configs/database");

if (!global.crypto) {
  global.crypto = crypto.webcrypto;
}

global.crypto.randomUUID ??= crypto.randomUUID;

const PORT = process.env.PORT || 3000;

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("Conectado ao banco PostgreSQL com sucesso!");

    const User = require("./models/User");
    const Application = require("./models/Application");

    User.hasMany(Application, {
      foreignKey: "userId",
      as: "applications"
    });

    Application.belongsTo(User, {
      foreignKey: "userId",
      as: "user"
    });

    await sequelize.sync();
    console.log("Tabelas sincronizadas com sucesso!");

    const server = http.createServer(app);

    server.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });

  } catch (error) {
    console.error("Erro ao conectar com o banco:", error);
  }
}

connectDB();