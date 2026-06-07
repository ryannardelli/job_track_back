const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRouters");
const applicationRoutes = require("./routes/applicationRoutes");

const app = express();
const handleError = require("./middleware/handleError");

app.use(cors({
  origin: [
    "http://localhost:5173",
  ],
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/application", applicationRoutes);

// Swagger
const { swaggerUi, swaggerSpec } = require("./configs/swagger");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// middleware
app.use(handleError);

module.exports = app;
