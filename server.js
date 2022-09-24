// External module require express
const express = require("express");

//req express
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("dotenv").config();
const session = require("express-session");
const SESSION_SECRET = process.env.SESSION_SECRET;
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

//port connection
const PORT = process.env.PORT || 3000;

//base route
app.get("/", (req, res) => {
  res.send("hello group");
});

//app.listen for port
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});

// app.get('/' ,(req, res)=>{
//     res.send("hello group")
// })
