const { register, login } = require('../services/authService');

exports.register = async (req, res) => {
  // 验证请求
  if (!req.body.username || !req.body.password || !req.body.email) {
    res.status(400).send({
      message: "用户名、密码和邮箱不能为空!"
    });
    return;
  }

  try {
    const user = await register(req);
    res.send({
      message: "用户注册成功!",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
};

exports.login = async (req, res) => {
  // 验证请求
  if (!req.body.username || !req.body.password) {
    res.status(400).send({
      message: "用户名和密码不能为空!"
    });
    return;
  }

  try {
    const data = await login(req);
    res.send(data);
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
}; 