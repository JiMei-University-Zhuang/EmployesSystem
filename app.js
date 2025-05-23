const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// 跨域配置
app.use(cors());

// 解析请求
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 请求日志中间件
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// API文档
app.use('/apidoc', express.static(path.join(__dirname, 'apidoc')));

// 数据库
const db = require("./models");
db.sequelize.sync()
  .then(() => {
    console.log("数据库同步成功.");
  })
  .catch((err) => {
    console.error("数据库同步失败:", err);
  });

// 路由
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todos');

app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

// 404处理
app.use((req, res) => {
  res.status(404).send({
    message: `找不到路径: ${req.path}`
  });
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    message: err.message || "服务器内部错误!"
  });
});

// 设置端口并启动服务器
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}.`);
  console.log(`API文档地址: http://localhost:${PORT}/apidoc`);
}); 