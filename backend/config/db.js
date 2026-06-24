const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config({ path: "backend/.env" });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

let databaseReady;

const initializeDatabase = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      title VARCHAR(150) NOT NULL,
      description TEXT NOT NULL,
      status VARCHAR(20) NOT NULL DEFAULT 'To Do',
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
      CONSTRAINT tasks_status_check CHECK (status IN ('To Do', 'In Progress', 'Done'))
    );
  `);
};

const ensureDatabaseReady = async () => {
  if (!databaseReady) {
    databaseReady = initializeDatabase();
  }

  return databaseReady;
};

module.exports = {
  pool,
  initializeDatabase,
  ensureDatabaseReady
};
