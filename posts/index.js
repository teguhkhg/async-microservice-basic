const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { randomBytes } = require("crypto");

const app = express();
app.use(express.json());
app.use(cors());

const db = [];

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");

  const data = {
    id,
    title: req.body.title,
  };

  db[id] = data;
  
  console.log(db);
  await axios.post("http://localhost:4000/events", {
    type: "POST_CREATED",
    data,
  });

  res.status(201).send(data);
});

app.post("/events", async (req, res) => {
  res.status(200).send("ok");
});

app.listen("4001", () => {
  console.log("app is listening to port 4001");
});
