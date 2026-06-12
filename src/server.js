// const crypto = require("crypto");

// const app = require("./app");
// const http = require("http");

// const sequelize = require("./configs/database");

// if (!global.crypto) {
//   global.crypto = crypto.webcrypto;
// }

// global.crypto.randomUUID ??= crypto.randomUUID;

// const PORT = process.env.PORT || 3000;

// async function connectDB() {
//   try {
//     await sequelize.authenticate();
//     console.log("Conectado ao banco PostgreSQL com sucesso!");

//     const User = require("./models/User");
//     const Application = require("./models/Application");

//     User.hasMany(Application, {
//       foreignKey: "userId",
//       as: "applications"
//     });

//     Application.belongsTo(User, {
//       foreignKey: "userId",
//       as: "user"
//     });

//     await sequelize.sync();
//     console.log("Tabelas sincronizadas com sucesso!");

//     const server = http.createServer(app);

//     server.listen(PORT, () => {
//       console.log(`Servidor rodando na porta ${PORT}`);
//     });

//   } catch (error) {
//     console.error("Erro ao conectar com o banco:", error);
//   }
// }

// connectDB();

const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

const os = require("os");
const crypto = require("crypto");

const app = require("./app");
const http = require("http");

const sequelize = require("./configs/database");

const PORT = process.env.PORT || 3000;

if (!global.crypto) {
  global.crypto = crypto.webcrypto;
}

global.crypto.randomUUID ??= crypto.randomUUID;

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("✔ Conectado ao banco PostgreSQL com sucesso!");

    const User = require("./models/User");
    const Application = require("./models/Application");

    User.hasMany(Application, {
      foreignKey: "userId",
      as: "applications",
    });

    Application.belongsTo(User, {
      foreignKey: "userId",
      as: "user",
    });

    await sequelize.sync();
    console.log("Tabelas sincronizadas com sucesso!");

    const server = http.createServer(app);

    server.listen(PORT, "0.0.0.0", () => {
      const networkInterfaces = os.networkInterfaces();

      let localIP = "localhost";

      for (const interfaceName in networkInterfaces) {
        for (const net of networkInterfaces[interfaceName]) {
          if (net.family === "IPv4" && !net.internal) {
            localIP = net.address;
          }
        }
      }

      console.log(`
🚀 Servidor rodando com sucesso!

Local:   http://localhost:${PORT}
Swagger: http://localhost:${PORT}/api-docs
Rede:    http://${localIP}:${PORT}
      `);
    });

  } catch (error) {
    console.error("❌ Erro ao conectar com o banco:");
    console.error(error);

    process.exit(1);
  }
}

connectDB();