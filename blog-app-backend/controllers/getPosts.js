const { models } = require("../config/dbConfig");

module.exports = async (req, res) => {
  const posts = await models.Post.findAll();
  let allPosts = [];
  for (x of posts) {
    const comments = [];
    const allComments = await x.getComments({
      where: {
        ParentCommentId: null,
      },
    });

    allComments.forEach(async (comment) => {
      comment.dataValues["nestedComment"] = await models.Comment.findAll({
        where: {
          ParentCommentId: comment.dataValues.comment_id,
        },
      });

      comments.push(comment);
    });

    const allImages = await x.getImages();

    const images = [];
    allImages.forEach((img) => {
      images.push(img.dataValues.id);
    });

    const allLikes = await models.Like.findAll({
      where: {
        type: "like",
        PostPostId: x.post_id,
      },
      attributes: ["UserUsername"],
    });

    const likes = {};
    allLikes.forEach((user) => {
      likes[user.UserUsername] = true;
    });
    const allDislikes = await models.Like.findAll({
      where: {
        type: "dislike",
        PostPostId: x.post_id,
      },
      attributes: ["UserUsername"],
    });

    const dislikes = {};
    allDislikes.forEach((user) => {
      dislikes[user.UserUsername] = true;
    });

    allPosts = [
      ...allPosts,
      {
        ...x.dataValues,
        comments: [...comments],
        likes: likes,
        dislikes: dislikes,
        images: [...images],
      },
    ];
  }
  return res.status(200).json([...allPosts]);
};
