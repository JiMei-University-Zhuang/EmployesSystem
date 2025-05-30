module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    role: {
      type: Sequelize.ENUM('admin', 'hr', 'manager', 'employee'),
      defaultValue: 'employee'
    },
    status: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  });

  return User;
}; 