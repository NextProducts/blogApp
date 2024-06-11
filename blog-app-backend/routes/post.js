const { v4 } = require("uuid");

const multer = require("multer");

const getPosts = require("../controllers/getPosts");
const newPost = require("../controllers/newPost");
const {
  like,
  dislike,
  newComment,
  replyComment,
} = require("../controllers/Post");

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

router.get("/", getPosts);
router.post("/new", upload.array("images", 8), newPost);
router.post("/:id/comments/new", newComment);
router.post("/:id/like", like);
router.post("/:id/dislike", dislike);
router.post("/:id/comments/reply", replyComment);

module.exports = router;
