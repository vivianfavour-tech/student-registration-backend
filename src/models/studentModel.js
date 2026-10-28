const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || "localhost",
  port: Number(process.env.MYSQL_PORT) || 3306,
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  database: process.env.MYSQL_DATABASE || "student_registration",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function initializeDatabase() {
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS students (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT,
      name VARCHAR(150) NOT NULL,
      course VARCHAR(150) NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id)
    )
  `);
}

async function createStudent(name, course) {
  const [result] = await pool.execute(
    "INSERT INTO students (name, course) VALUES (?, ?)",
    [name, course],
  );

  return { id: result.insertId, name, course };
}

async function getStudents() {
  const [rows] = await pool.execute(
    "SELECT id, name, course FROM students ORDER BY id DESC",
  );

  return rows;
}

async function closeDatabase() {
  await pool.end();
}

module.exports = { initializeDatabase, createStudent, getStudents, closeDatabase };
