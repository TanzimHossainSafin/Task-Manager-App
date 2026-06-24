const express = require("express");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");
const { ensureDatabaseReady } = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

app.use(async (req, res, next) => {
  try {
    await ensureDatabaseReady();
    next();
  } catch (error) {
    next(error);
  }
});

app.get("/", (req, res) => {
  res.json({ message: "Task Manager API is running" });
});

app.use("/api/tasks", taskRoutes);

module.exports = app;
