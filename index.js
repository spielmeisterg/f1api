const express = require("express")
const getDriverData = require("./getResults.js")
const getPuData = require("./getPuData.js")
const results = require("./data/results.js")
const puData = require("./data/puData.js")
const app = express()
const port = 3001
const trimmedPuData = puData.pages[1].txtRns.map(value => value.text)
let data = []
let puUsage = []

let cors = require("cors");
app.use(cors());
app.use(express.json())

function retrieveData(results, offset) {
    if(data.length <= 0){
        for(let i = 0; i <= 19; i++){
        data.push(getDriverData(i, results,offset))
    }
        console.log("getting driver results")
        return data
    }
    else{
        return data
    }
}
app.get("/results", (req,res) => {
    const trimmedResults = results.pages[1].txtRns.map(value => value.text)
    res.json(retrieveData(trimmedResults,0))
})

app.get("/pu", (req,res) => {
    for(let i = 0; i <= 19; i++){
        puUsage.push(getPuData(i, trimmedPuData,0))
    }
    console.log("getting pu data")
    res.json(puUsage)
})
app.post("/upload", (req,res) => {
    console.log(req.params)
    results = JSON.parse(req.params.json)
    res.send("test")
})

app.listen(port, () => console.log(`application is listening on http://localhost:${port}`))