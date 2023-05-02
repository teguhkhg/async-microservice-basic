const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { randomBytes } = require("crypto");

const app = express();
app.use(express.json());
app.use(cors());

const db = {};

app.get("/query", async (req, res) => {
  res.status(200).send(db);
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  switch (type) {
    case "POST_CREATED":
      db[data.id] = {
        id: data.id,
        comments: [],
      };
      break;
    case "COMMENT_CREATED":
      const { id, comment } = data;

      const { comments } = db[id];
      comments.push(comment);
      db[data.id].comments = comments;
      break;
    default:
  }

  console.log(db);
  res.status(200).send("ok");
});

app.listen("4003", () => {
  console.log("app is listening to port 4003");
});
