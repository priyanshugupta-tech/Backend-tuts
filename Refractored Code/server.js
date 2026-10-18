const express = require("express");
const app = express();
const userRoutes = require("./routes/user.routes");
const { DBConnect } = require("./config/db");
const { logger } = require("./middlewares/logger");

const PORT = 5000;

// Database connection
DBConnect("mongodb://127.0.0.1:27017/school-db")
  .then(() => console.log("mongodb connected📎"))
  .catch((err) => console.log("error in connecting mongodb: ", err));

// Middleware
app.use(express.json());
app.use(logger("./logs.text"));

// Routes
app.use("/api/students", userRoutes);

// Server
app.listen(PORT, () => console.log(`app is listening at PORT: ${PORT}`));
