// External module require express
const express = require("express");
//set app to equal express
const app = express();
//req cors
const cors = require("cors");
require("dotenv").config();
const session = require("express-session");
const SESSION_SECRET = process.env.SESSION_SECRET;
//port connection
const PORT = process.env.PORT || 3000;

//adding whitelist
const whitelist = ["http://localhost:3000", "http://localhost:3009"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by cors"));
    }
  },
};

//middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

const routes = require("./routes");

//req db connection
require("./config/db.connections");

//conection to routes
app.use("/", require("./routes/dashboard.routes"));
app.use("/", require("./routes/users.routes"));

//app.listen for port
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
