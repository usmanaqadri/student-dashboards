// External module require express
const express = require('express')

const app = express()

const PORT = process.env.PORT || 3000;

app.get('/' ,(req, res)=>{
    res.send("hello group")
})

app.listen(PORT, ()=>{
    console.log('Listening on', PORT)
})