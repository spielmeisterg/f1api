const express = require("express")
const getDriverData = require("./getResults.js")
const getPuData = require("./getPuData.js")
const results = require("./data/results.js")
const puData = require("./data/puData.js")
const app = express()
const port = 3000
const trimmedResults = results.pages[1].txtRns.map(value => value.text)
const trimmedPuData = puData.pages[1].txtRns.map(value => value.text)
let data = []
let puUsage = []


app.get("/upload", (req,res) => {
    res.sendFile(__dirname + "/public/upload.html")
})
app.get("/upload/results",(req, res) => {
    res.sendFile(__dirname + "/public/resultsUpload.html")
})
app.get("/upload/pu",(req, res) => {
    res.sendFile(__dirname + "/public/puUpload.html")
})
app.post("/upload/results", (req,res) => {
    console.log("tried to update results")
    res.send("tried to update results")
})
app.post("/upload/pu", (req,res) => {
    console.log("tried to update pu usage")
    res.send("tried to update pu usage")
})
app.get("/data", (req,res) => {
    for(let i = 0; i <= 19; i++){
        data.push(getDriverData(i, trimmedResults,0))
    }
    console.log("getting driver results")
    res.json(data)
})

app.get("/pudata", (req,res) => {
    for(let i = 0; i <= 19; i++){
        puUsage.push(getPuData(i, trimmedPuData,0))
    }
    console.log("getting pu data")
    res.json(puUsage)
})

app.listen(port, () => console.log(`application is listening on http://localhost:${port}`))