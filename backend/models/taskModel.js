const { pool } = require("../config/db");

const findAll = async () => {
  const result = await pool.query(
    "SELECT id, title, description, status, created_at, updated_at FROM tasks ORDER BY created_at DESC"
  );

  return result.rows;
};

const create = async ({ title, description, status }) => {
  const result = await pool.query(
    `INSERT INTO tasks (title, description, status)
     VALUES ($1, $2, $3)
     RETURNING id, title, description, status, created_at, updated_at`,
    [title, description, status]
  );

  return result.rows[0];
};

const updateStatus = async (id, status) => {
  const result = await pool.query(
    `UPDATE tasks
     SET status = $1, updated_at = NOW()
     WHERE id = $2
     RETURNING id, title, description, status, created_at, updated_at`,
    [status, id]
  );

  return result.rows[0];
};

const remove = async (id) => {
  const result = await pool.query(
    "DELETE FROM tasks WHERE id = $1 RETURNING id",
    [id]
  );

  return result.rows[0];
};

module.exports = {
  findAll,
  create,
  updateStatus,
  remove
};
