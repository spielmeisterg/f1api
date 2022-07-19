const getPuData = (i, result, offset) => {
    let puData = {
        driverNumber: 0,
        teamName: "john doe team",
        driverName: "john doe",
        ice: 0,
        tc: 0,
        mguh: 0,
        mguk: 0,
        es: 0,
        ce: 0,
        ex: 0
    }
    let puDataArray = []
    for(let j = 101 + (i*10); j < 111 + (i*10); j++){
        puDataArray.push(result[j])
        puDataArray.map((value, index) => {
            puData[Object.keys(puData)[index]] = value
        })
    }
    return puData
}

module.exports = getPuData