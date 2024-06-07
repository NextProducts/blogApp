const { configDotenv } = require("dotenv");
const { Sequelize } = require("sequelize");

const dotenv = configDotenv().parsed;

const sequelize = new Sequelize(
  dotenv.DB_DATABASE,
  dotenv.DB_USERNAME,
  dotenv.DB_PASSWORD,
  {
    dialect: dotenv.DB_DIALECT,
    host: dotenv.DB_HOST,
    port: dotenv.DB_PORT,
  }
);

const UserModel = require("../models/User");
const PostModel = require("../models/Post");
const CommentModel = require("../models/Comment");
const LikeModel = require("../models/Like");
const ImageModel = require("../models/Image");

const Like = LikeModel(sequelize);
const User = UserModel(sequelize);
const Post = PostModel(sequelize);
const Comment = CommentModel(sequelize);
const Image = ImageModel(sequelize);

const models = {
  User,
  Post,
  Comment,
  Like,
  Image,
};

Object.keys(models).forEach((model) => {
  if (models[model].associate) {
    models[model].associate(models);
  }
});

module.exports = { models, sequelize, Sequelize };
