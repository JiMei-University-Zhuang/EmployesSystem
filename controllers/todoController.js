const { create, update, destroy, findAll, findOne, findValidTodo } = require('../services/todoService');

// 创建并保存一条Todo
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "内容不能为空"
    });
    return;
  }

  try {
    let data = await create(req)
    res.send(data);
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
};

// 从数据库中搜索
exports.findAll = async (req, res) => {
  try {
    let data = await findAll(req)
    res.send(data);
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
};

// 按照ID查找Todo
exports.findOne = async (req, res) => {
  try {
    let data = await findOne(req)
    res.send(data);
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
};

// 更新指定ID的Todo
exports.update = async (req, res) => {
  try {
    await update(req);
    res.send({
      message: "更新成功"
    });
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
};

// 删除指定ID的Todo
exports.destroy = async (req, res) => {
  try {
    await destroy(req);
    res.send({
      message: "删除成功"
    });
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
};

// 查询有效的Todo
exports.findValidTodo = async (req, res) => {
  try {
    let data = await findValidTodo();
    res.send(data);
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
}; 