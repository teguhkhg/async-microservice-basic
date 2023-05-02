const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { randomBytes } = require("crypto");

const app = express();
app.use(express.json());
app.use(cors());

const db = [];

app.post("/posts/:id/comments", async (req, res) => {
  const { id: postId } = req.params;

  if (!posts.includes(postId)) {
    return res.status(404).send("post not found");
  }

  const commentId = randomBytes(4).toString("hex");

  const data = {
    id: commentId,
    content: req.body.content,
    status: "PENDING",
  };

  const { comments } = db[postId];
  comments.push(data);
  db[postId].comments = comments;

  console.log(db);
  await axios.post("http://localhost:4000/events", {
    type: "COMMENT_CREATED",
    data,
  });

  res.status(201).send(data);
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "POST_CREATED") {
    db.push({
      id: data.id,
      comments: [],
    });
  }

  console.log(db);
  res.status(200).send("ok");
});

app.listen("4002", () => {
  console.log("app is listening to port 4001");
});
