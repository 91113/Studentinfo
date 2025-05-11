const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// 数据库连接
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'studentinfo',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 登录接口
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const [rows] = await pool.promise().query(
      'SELECT * FROM users WHERE username = ? AND password = ?',
      [username, password]
    );

    if (rows.length > 0) {
      const user = rows[0];
      res.json({
        success: true,
        user: {
          id: user.id,
          username: user.username,
          role: user.role
        }
      });
    } else {
      res.json({
        success: false,
        message: '用户名或密码错误'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '服务器错误'
    });
  }
});

// 注册接口
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    await pool.promise().query(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, password]
    );
    
    res.json({
      success: true,
      message: '注册成功'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '用户名已存在或服务器错误'
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 