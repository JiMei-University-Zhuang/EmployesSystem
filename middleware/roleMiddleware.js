const db = require("../models");
const User = db.users;

const checkRole = (roles) => {
  return async (req, res, next) => {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(404).send({
          message: "用户未找到!"
        });
      }

      if (roles.includes(user.role)) {
        next();
        return;
      }

      res.status(403).send({
        message: "需要" + roles.join(',') + "权限!"
      });

    } catch (error) {
      res.status(500).send({
        message: error.message || "验证用户角色时出错!"
      });
    }
  };
};

const roleMiddleware = {
  checkRole
};

module.exports = roleMiddleware; 