const app = require("./app");
const { initializeDatabase } = require("./config/db");

const PORT = process.env.PORT || 5001;

const startServer = async () => {
  try {
    await initializeDatabase();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Could not start server:", error.message);
    process.exit(1);
  }
};

startServer();
