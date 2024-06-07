const { v4 } = require("uuid");
const { models } = require("../config/dbConfig");
const Comments = require("../models/Comment");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../blog-app/public/uploads");
  },

  filename: function (req, file, cb) {
    cb(null, v4() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

const router = require("express").Router();

router.get("/", async (req, res) => {
  const posts = await models.Post.findAll();
  let allPosts = [];
  for (x of posts) {
    const comments = await x.getComments();
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
});

router.post("/new", upload.array("images", 8), async (req, res) => {
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
});

router.post("/:id/comments/new", async (req, res) => {
  const post_id = req.params.id;

  const { username, comment } = req.body;
  const post = await models.Post.findByPk(post_id);

  const newComment = await post.createComment({
    comment_id: v4(),
    UserUsername: username,
    body: comment,
  });

  return res.status(200).json({ ...newComment.dataValues });
});

router.post("/:id/like", async (req, res) => {
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
});

router.post("/:id/dislike", async (req, res) => {
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
});

module.exports = router;
