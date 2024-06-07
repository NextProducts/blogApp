const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Like = sequelize.define("Like", {
    type: {
      type: DataTypes.ENUM("like", "dislike"),
    },
  });
  return Like;
};
