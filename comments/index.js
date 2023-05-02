const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { randomBytes } = require("crypto");

const app = express();
app.use(express.json());
app.use(cors());

const db = {};
const { postCreated, commentModerated } = require("./event")(db);

app.post("/posts/:id/comments", async (req, res) => {
  const { id: postId } = req.params;

  if (!db[postId]) {
    return res.status(404).send(`post not found. [id: ${postId}]`);
  }

  const commentId = randomBytes(4).toString("hex");
  const comment = {
    id: commentId,
    content: req.body.content,
    status: "PENDING",
  };
  db[postId].comments.push(comment);

  console.log(db);
  await axios.post("http://localhost:4000/events", {
    type: "COMMENT_CREATED",
    data: {
      ...comment,
      postId,
    },
  });

  res.status(201).send(comment);
});


app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  switch (type) {
    case "POST_CREATED":
      postCreated(type, data);
      break;

    case "COMMENT_MODERATED":
      await commentModerated(type, data);
      break;
    default:
  }

  console.log(db);
  res.status(200).send("ok");
});

app.listen("4002", () => {
  console.log("app is listening to port 4002");
});
