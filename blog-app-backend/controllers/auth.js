const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { configDotenv } = require("dotenv");
const { models } = require("../config/dbConfig");
const dotenv = configDotenv().parsed;

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await models.User.findByPk(username);
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = jwt.sign({ username }, dotenv.TOKEN_SECRET, {
        expiresIn: "1h",
      });
      return res.status(200).json({ message: "logged in", token: token });
    }
    return res.status(401).send({ message: "Wrong Password" });
  }
  return res.status(404).send({ message: "Wrong username" });
};

exports.signup = async (req, res) => {
  try {
    const user = await models.User.findByPk(req.body.username);
    if (!user) {
      const salt = bcrypt.genSaltSync(10);
      const passwordHash = bcrypt.hashSync(req.body.password, salt);
      models.User.create({
        username: req.body.username,
        email: req.body.email,
        password: passwordHash,
      });
      return res.status(200).send({ Sucess: true, Message: "User Created" });
    } else {
      return res
        .status(409)
        .send({ sucess: false, message: "User already exists" });
    }
  } catch (error) {
    console.log(error);
  }
};
