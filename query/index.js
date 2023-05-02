const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const db = {};
const { postCreated, commentCreated, commentUpdated } = require("./event")(db);

app.get("/posts", async (req, res) => {
  res.status(200).send(db);
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  switch (type) {
    case "POST_CREATED":
      postCreated(type, data);
      break;

    case "COMMENT_CREATED":
      commentCreated(type, data);
      break;

    case "COMMENT_UPDATED":
      commentUpdated(type, data);
      break;

    default:
  }

  console.log(db);
  res.status(200).send("ok");
});

app.listen("4003", () => {
  console.log("app is listening to port 4003");
});
