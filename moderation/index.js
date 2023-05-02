const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  switch (type) {
    case "COMMENT_CREATED":
      console.log("event received with type ", type);
      const status = data.content.includes("bad word")
        ? "REJECTED"
        : "APPROVED";

      await axios.post("http://localhost:4000/events", {
        type: "COMMENT_MODERATED",
        data: {
          ...data,
          status,
        },
      });

      break;

    default:
  }

  res.status(200).send("ok");
});

app.listen("4004", () => {
  console.log("app is listening to port 4004");
});
