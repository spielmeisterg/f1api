const mongoose = require("mongoose")

const result = new mongoose.Schema({
    eventName: mongoose.Schema.Types.Mixed,
    eventType: mongoose.Schema.Types.Mixed,
    position: mongoose.Schema.Types.Mixed,
    driverNumber: mongoose.Schema.Types.Mixed,
    driverName: mongoose.Schema.Types.Mixed,
    teamName: mongoose.Schema.Types.Mixed,
    completedLaps: mongoose.Schema.Types.Mixed,
    totalRaceTime: mongoose.Schema.Types.Mixed,
    gap: mongoose.Schema.Types.Mixed,
    interval: mongoose.Schema.Types.Mixed,
    topSpeed: mongoose.Schema.Types.Mixed,
    fastestLap: mongoose.Schema.Types.Mixed,
    fastestLapNumber: mongoose.Schema.Types.Mixed,
    points: mongoose.Schema.Types.Mixed
})

module.exports = mongoose.model("ResultModel", result, "results")
