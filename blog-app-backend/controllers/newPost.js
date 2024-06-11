const { v4 } = require("uuid");
const { models } = require("../config/dbConfig");

module.exports = async (req, res) => {
  const { body, username } = req.body;
  const user = await models.User.findByPk(username);
  if (!user) return res.status(404).send({ message: "User not found" });

  const post = await models.Post.create({
    content: body,
    UserUsername: username,
    post_id: v4(),
  });

  const images = [];
  for (let img of req.files) {
    const Image = await post.createImage({
      id: img.filename,
    });

    images.push(Image.dataValues.id);
  }

  res.send({
    post: { ...post.dataValues, images },
    message: "Post Created",
  });
};
