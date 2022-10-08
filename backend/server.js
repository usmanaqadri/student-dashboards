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
let baseUrl =
  process.env.NODE_ENV === "development"
    ? "localhost"
    : "https://student-dashboards.herokuapp.com";
//port connection
const PORT = process.env.PORT || process.env.BACKEND_PORT || 3009;

//adding whitelist
// const whitelist = [
//   `http://localhost:${PORT}`,
//   `http://localhost:${process.env.FRONTEND_PORT}`,
// ];
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin) {
//       //for bypassing postman req with  no origin
//       return callback(null, true);
//     }
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };

//middleware
// app.use(cors(corsOptions));
app.use(
  cors({
    origin: [
      "http://localhost:3006",
      "https://student-dashboards.herokuapp.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   next();
// });
app.use(cookieParser());

const routes = require("./routes");

//req db connection
require("./config/db.connections");

//conection to routes
app.use("/", require("./routes/dashboard.routes"));
app.use("/", require("./routes/users.routes"));

//using build folder

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