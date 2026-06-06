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


    await sequelize.sync();
    console.log("Tabelas sincronizadas com sucesso!");

  } catch (error) {
    console.error("Erro ao conectar com o banco:", error);

  }
}
  connectDB();