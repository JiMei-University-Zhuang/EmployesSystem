module.exports = app => {
  const todos = require("../controllers/todoController.js");

  var router = require("express").Router();

  // 创建新的Todo
  router.post("/", todos.create);

  // 检索所有Todo
  router.get("/", todos.findAll);

  // 检索有效状态的Todo
  router.get("/valid", todos.findValidTodo);

  // 检索单个Todo
  router.get("/:id", todos.findOne);

  // 更新Todo
  router.put("/:id", todos.update);

  // 删除Todo
  router.delete("/:id", todos.destroy);

  app.use('/api/todos', router);
}; 