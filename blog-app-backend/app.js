const express = require("express");
const cors = require("cors");
const user = require("./routes/user");
const post = require("./routes/post");
const { sequelize } = require("./config/dbConfig");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use("/user", user);
app.use("/post", post);
app.listen(7000, () => {
  try {
    // sequelize.sync({ force: true });
  } catch (err) {
    console.log(err);
  }
  console.log("Listening on port 7000");
});
