const { Client } = require('pg');
const cors = require('cors');
const express = require('express');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json());

const con = new Client({
  host: "localhost",
  user: "postgres",
  port: "5432",
  password: "0786690541@Elie",
  database: "Student"
});

con.connect().then(() => console.log('server is running...'));

app.post('/posting', async (req, res) => {
  const { username, password } = req.body;

  try {
    const check_query = 'SELECT * FROM workers WHERE username = $1';
    const check_result = await con.query(check_query, [username]);

    if (check_result.rows.length > 0) {
      return res.status(409).send('Username already exists.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insert_query = 'INSERT INTO workers(username, password) VALUES ($1, $2)';
    await con.query(insert_query, [username, hashedPassword]);

    res.send('User registered successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error.');
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const check_query = 'SELECT * FROM workers WHERE username = $1';
    const check_result = await con.query(check_query, [username]);

    if (check_result.rows.length === 0) {
      return res.status(404).send('User not found.');
    }

    const user = check_result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send('Invalid password.');
    }

    res.send('Login successful.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error.');
  }
});

app.listen(5000, () => console.log('my server is running'));
