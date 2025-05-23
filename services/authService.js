const db = require("../models");
const config = require("../config/auth.config");
const User = db.users;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req) => {
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      role: req.body.role
    });

    return user;
  } catch (error) {
    throw Error(error.message || "注册用户时出错!");
  }
};

exports.login = async (req) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username
      }
    });

    if (!user) {
      throw Error("用户不存在!");
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      throw Error("密码错误!");
    }

    if (!user.status) {
      throw Error("用户已被禁用!");
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: config.jwtExpiration
    });

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      accessToken: token
    };
  } catch (error) {
    throw Error(error.message || "登录时出错!");
  }
}; 