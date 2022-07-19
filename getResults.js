let iteration = 0
const getDriverData = (i,result, offset) =>{
    let firstDnf = 0
    result.map((value, index) => {
        if(value.trim() === "NOT CLASSIFIED"){
            firstDnf = index
            return index
        }
    })
    let driverData = {
        position: 0,
        driverNumber: 0,
        driverName: "john doe",
        teamName: "john doe team",
        completedLaps: 0,
        totalRaceTime: 0,
        gap: 0,
        interval: 0,
        topSpeed: 0,
        fastestLap: 0,
        fastestLapNumber: 0,
        points: 0
    }
    let driverArray = []
    if(i===0){
        for(let j = 15+offset; j < 25+offset; j++){
            driverArray.push(result[j])
            
        }
        driverArray.map((value, index) => {
            if(index < 6){
                driverData[Object.keys(driverData)[index]] = value
            }
            else{
                driverData[Object.keys(driverData)[index+2]] = value
            }
        })

    }
    else if(i>9){
        let count = 0
        for(let j = (133+((i-10)*11))+offset; j < (144+((i-10)*11))+offset; j++){
            if(j < firstDnf){
                driverArray.push(result[j]) 
                driverArray.map((value, index) => {
                    driverData[Object.keys(driverData)[index]] = value
                }) 
            }
            else{
                for(let j = firstDnf + (9* iteration) + 1; j < (firstDnf + 9) + (9*iteration) + 1; j++){
                    
                    driverArray.push(result[j]) 
                    driverArray.map((value, index) => {
                        if(index < 6){
                            driverData[Object.keys(driverData)[index+1]] = value
                        }
                        else{
                            driverData[Object.keys(driverData)[index+2]] = value
                        }
                    })
                }
                iteration ++
                break
            }
        }
    }
    else{
        for(let j = (13+(i*12))+offset; j < (25+(i*12))+offset; j++){
            driverArray.push(result[j])
        }
        driverArray.map((value, index) => {
            driverData[Object.keys(driverData)[index]] = value
        })
    }

    return driverData
}


module.exports = getDriverData