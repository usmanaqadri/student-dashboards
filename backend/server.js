// External module require express
const express = require("express");
//set app to equal express
const app = express();
//req cors
const cors = require("cors");
require("dotenv").config();
const session = require("express-session");
const SESSION_SECRET = process.env.SESSION_SECRET;
const cookieParser = require("cookie-parser");
const path = require("path");
// base URL
let baseUrl = "http://localhost";
//port connection
const PORT = process.env.PORT || process.env.BACKEND_PORT || 3009;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cookieParser());
app.use(
  cors({
    origin: [
      `${baseUrl}:${process.env.FRONTEND_PORT}`,
      "https://student-dashboards.herokuapp.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//req db connection
require("./config/db.connections");

//conection to routes
const routes = require("./routes");
app.use("/", require("./routes/dashboard.routes"));
app.use("/", require("./routes/users.routes"));

//using build folder when going to production
if (process.env.NODE_ENV === "production") {
  baseUrl = "https://student-dashboards.herokuapp.com";
  app.use(express.static(path.join(__dirname, "build")));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
}

//app.listen for port
app.listen(PORT, () => {
  console.log(`Listening on ${baseUrl}:${PORT}`);
});
