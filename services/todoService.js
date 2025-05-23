const db = require("../models");
const Todo = db.todos;
const Op = db.Sequelize.Op;

// 创建并保存一条Todo
exports.create = async (req) => {
  // 创建一条Todo
  const todo = {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status ? req.body.status : false
  };

  // 将Todo保存到数据库
  try {
    return await Todo.create(todo)
  } catch (error) {
    throw Error(error.message || "创建Todo是发生错误！")
  }
};

// 从数据库中搜索
exports.findAll = async (req) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  try {
    return await Todo.findAll({ where: condition })
  } catch (error) {
    throw Error(error.message || "搜索时，发生错误！")
  }
};

// 按照ID查找Todo
exports.findOne = async (req) => {
  const id = req.params.id;

  try {
    let data = await Todo.findByPk(id)
    if (data) {
      return data
    } else {
      throw Error(`没有找到id为${id}的Todo呀`)
    }
  } catch (error) {
    throw Error(`查询id为${id}的Todo时出错！`)
  }
};

// 更新指定ID的Todo
exports.update = async (req) => {
  const id = req.params.id;

  try {
    let num = await Todo.update(req.body, {
      where: { id: id }
    })

    if (num == 1) {
      return true
    } else {
      throw Error(`更新id为${id}的Todo失败！`)
    }
  } catch (error) {
    throw Error(`更新id为${id}的Todo出错！`)
  }
};

// 删除指定ID的Todo
exports.destroy = async (req) => {
  const id = req.params.id;

  try {
    let num = await Todo.destroy({
      where: { id: id }
    })
    if (num == 1) {
      return true
    } else {
      throw Error(`删除id为${id}的Todo失败！`)
    }

  } catch (error) {
    throw Error(`删除id为${id}的Todo出错！`)
  }
};

// 查询有效的Todo
exports.findValidTodo = async () => {
  try {
    return await Todo.findAll({ where: { status: true } })
  } catch (error) {
    throw Error(error.message || "查询Todo时出错！")
  }
}; 