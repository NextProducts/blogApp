const { models } = require("../config/dbConfig");
const { v4 } = require("uuid");

exports.like = async (req, res) => {
  const post_id = req.params.id;
  const { username } = req.body;

  const user = await models.Like.findOne({
    where: {
      PostPostId: post_id,
      UserUsername: username,
    },
  });

  if (user == null) {
    models.Like.create({
      type: "like",
      PostPostId: post_id,
      UserUsername: username,
    });
  } else {
    if (user.dataValues.type == "like") {
      user.destroy();
    } else {
      user.type = "like";
      await user.save();
    }
  }
  return res.status(200).send("response registered");
};

exports.dislike = async (req, res) => {
  const post_id = req.params.id;
  const { username } = req.body;

  const user = await models.Like.findOne({
    where: {
      PostPostId: post_id,
      UserUsername: username,
    },
  });

  if (user == null) {
    models.Like.create({
      type: "dislike",
      PostPostId: post_id,
      UserUsername: username,
    });
  } else {
    if (user.dataValues.type == "dislike") {
      user.destroy();
    } else {
      user.type = "dislike";
      await user.save();
    }
  }
  return res.status(200).send("response registered");
};

exports.newComment = async (req, res) => {
  const post_id = req.params.id;

  const { username, comment } = req.body;
  const post = await models.Post.findByPk(post_id);

  const newComment = await post.createComment({
    comment_id: v4(),
    UserUsername: username,
    body: comment,
  });

  return res.status(200).json({ ...newComment.dataValues, nestedComment: [] });
};

exports.replyComment = async (req, res) => {
  const post_id = req.params.id;

  const { username, comment, parent, root, to } = req.body;
  const post = await models.Post.findByPk(post_id);
  const reply = await post.createComment({
    comment_id: v4(),
    UserUsername: username,
    body: `${root ? `@${to} ${comment}` : comment}`,
    ParentCommentId: parent,
  });

  return res.status(200).json({ ...reply.dataValues });
};
