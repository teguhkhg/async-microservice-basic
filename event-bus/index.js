const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

app.post("/events", async (req, res) => {
  const data = req.body;

  await axios.post("http://localhost:4001/events", data);
  await axios.post("http://localhost:4002/events", data);
  await axios.post("http://localhost:4003/events", data);

  res.status(200).send("ok");
});

app.listen("4000", () => {
  console.log("app is listening to port 4000");
});
