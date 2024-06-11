const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Comment = sequelize.define("Comment", {
    comment_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    body: {
      type: DataTypes.STRING,
    },
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.User);
    Comment.belongsTo(models.Post);
    Comment.hasOne(models.Comment, { as: "Parent" });
  };
  return Comment;
};
