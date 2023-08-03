const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());

const pool = mysql.createPool({
  host: "13.54.118.91",
  user: "root",
  password: "admin123",
  database: "portal",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.query(
  `
  CREATE TABLE IF NOT EXISTS employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
  )
`,
  (err, results) => {
    if (err) {
      console.error('Error creating "employees" table:', err);
    } else {
      console.log('Table "employees" created or already exists.');
    }
  }
);

app.get("/", (req, res) => {
  pool.query("SELECT * FROM employees", (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res.status(500).send("Error fetching data from database");
      return;
    }
    res.json(results);
  });
});

app.get("/info", (req, res) => {
  res.send("hey this is /info api");
});

app.listen(3000, () => {
  console.log("listening on 3000");
});
