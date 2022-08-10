const express = require("express")
const cors = require("cors");
const mongoose = require("mongoose")
const getDriverData = require("./getResults.js")
const getPuData = require("./getPuData.js")
const app = express()
const port = 3001
const uri = "mongodb+srv://ian:<!!PASSWORD!!>...@f1api.jdk9w.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(uri);
const db = mongoose.connection
const ResultModel = require("./schema/resultSchema.js")
let results
const puData = require("./data/puData.js")
let data = []
let puUsage = []

app.use(cors());
app.use(express.json())




// find the correct data from the array of strings
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

//get all driver results from currently uploaded file
app.get("/results", (req,res) => {
    res.json(data)
})


//get all power unit data from currently loaded file
app.get("/pu", (req,res) => {
    for(let i = 0; i <= 19; i++){
        puUsage.push(getPuData(i, trimmedPuData,0))
    }
    console.log("getting pu data")
    res.json(puUsage)
})

// send uploaded file to external page to check and confirm if the data is correctly extracted (at least it will do this eventually)
app.post("/upload", (req,res) => {
    data = {
        results: [],
        type: "",
        event: "",
        eventType: ""
    }
    if(String(req.body.type) === "results"){
        console.log("uploading results")
        results = JSON.parse(req.body.json)
        results = results.pages[1].txtRns.map(value => value.text)
        data.type = String(req.body.type)
        data.event = String(results[1])
        data.eventType = String(req.body.eventType)
        for(let i = 0; i <= 19; i++){
                data.results.push(getDriverData(i, results, 0))
            }
            res.redirect(200,"/upload/confirm")
    }
    if(String(req.body.type) === "pu"){
        console.log("uploading power unit data")
    }
    if(String(req.body.type) === "transmission"){
        console.log("uploading tranmission data")
    }
})
// Sending data back to the confirm page
app.get("/upload/confirm", (req,res) => {
    res.json(data)
})
// if previous page is confirmed to be correct we upload to mongodb
app.post("/upload/confirm", async (req, res) => {
    //check if current race already is registered or not
    const resultModelResults = await ResultModel.find({eventName: req.body.event.trim()})
    if(!resultModelResults.length > 0){
    req.body.results.map(async item => {
        let newUpload = new ResultModel({
            eventName: req.body.event.trim(),
            eventType: req.body.eventType,
            position: Number(item.position),
            driverNumber: Number(item.driverNumber),
            driverName: item.driverName,
            teamName: item.teamName,
            completedLaps: Number(item.completedLaps),
            totalRaceTime: item.totalRaceTime,
            gap: Number(item.gap),
            interval: Number(item.interval),
            topSpeed: Number(item.topSpeed),
            fastestLap: Number(item.fastestLap),
            fastestLapNumber: Number(item.fastestLapNumber),
            points: Number(item.points)
        })
            await newUpload.save()
    })
    }
    else{
        console.log("this race is already done, i dont think we need to duplicate it!")
    }
        
})

app.listen(port, () => console.log(`application is listening on http://localhost:${port}`))