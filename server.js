// External module require express
const express = require("express");

const app = express();

require("dotenv").config();

const routes = require("./routes");

app.use("/dashboard", routes.dashboards);

const PORT = process.env.PORT || 3003;

require("./config/db.connections.js");

app.get("/", (req, res) => {
  res.send("hello group");
});

app.listen(PORT, () => {
  console.log("Listening on", PORT);
});
