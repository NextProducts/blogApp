const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: {
        msg: "Username already taken",
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: {
          msg: "Not a valid email",
        },
      },
    },

    password: {
      type: DataTypes.STRING,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Post);
    User.hasMany(models.Comment);
    User.belongsToMany(models.Post, { through: models.Like });
  };

  return User;
};
