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

// 在创建连接池后添加
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection error:', err);
    return;
  }
  console.log('Database connected successfully');
  connection.release();
});

// 登录接口
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    console.log('Attempting login for user:', username);
    
    const [rows] = await pool.promise().query(
      'SELECT * FROM users WHERE username = ? AND password = ?',
      [username, password]
    );

    console.log('Query result:', rows);

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
    console.error('Login error:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
      res.status(500).json({
        success: false,
        message: error.response.data.message || '登录失败，请稍后重试'
      });
    } else if (error.request) {
      console.error('No response received');
      res.status(500).json({
        success: false,
        message: '无法连接到服务器，请检查网络连接'
      });
    } else {
      console.error('Request error:', error.message);
      res.status(500).json({
        success: false,
        message: '登录请求失败，请稍后重试'
      });
    }
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