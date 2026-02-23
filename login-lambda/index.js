const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');

exports.handler = async (event) => {
  try {
    const { email, password } = JSON.parse(event.body);

    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    const [rows] = await connection.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (rows.length === 0) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: 'User not found' })
      };
    }

    const user = rows[0];

    if (user.password !== password) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: 'Invalid password' })
      };
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Login successful', token })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};