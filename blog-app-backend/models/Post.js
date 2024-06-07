const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Post = sequelize.define("Post", {
    post_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },

    content: {
      type: DataTypes.STRING,
    },
  });

  Post.associate = (models) => {
    Post.belongsTo(models.User);
    Post.belongsToMany(models.User, { through: models.Like });
    Post.hasMany(models.Comment);
    Post.hasMany(models.Image);
  };

  return Post;
};
