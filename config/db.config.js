module.exports = {
  dialect: "sqlite",
  storage: "./database.sqlite",  // SQLite数据库文件路径
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
} 