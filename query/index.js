const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const db = {};
const { handleEvent } = require("./event")(db);

app.get("/posts", async (req, res) => {
  res.status(200).send(db);
});

app.post("/events", (req, res) => {
  handleEvent(req.body);
  res.status(200).send("ok");
});

app.listen("4003", async () => {
  console.log("app is listening to port 4003");

  try {
    const events = await axios.get("http://event-bus-srv:4000/events");
    for (const event of events.data) {
      handleEvent(event);
    }
  } catch (error) {
    console.log(error.message);
  }
});
