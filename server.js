// External module require express
const express = require('express')

//req express
const app = express()

//req routes
const routes = require('./routes')

//req db connection
require('./config/db.connections')

//conection to routes
app.use('/', require('./routes/dashboard.routes'));

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//port connection
const PORT = process.env.PORT || 3000;

//base route
app.get('/' ,(req, res)=>{
    res.send("hello group")
})


//app.listen for port
app.listen(PORT, ()=>{
    console.log(`Listening on http://localhost:${PORT}`)
})
