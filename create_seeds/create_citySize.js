const fs = require('fs')

const city_list = JSON.parse(fs.readFileSync('./data/urban_area_list.json'))

const citySize_list = []

let counter = 1
city_list.forEach(city => {
    const nextCity = city.toLowerCase().replaceAll(",", "").replaceAll(" ", "-").replaceAll(".", "")
    const details = JSON.parse(fs.readFileSync(`./data/cityDetails/${nextCity}_details.json`))
    details.pop()
    const found = details.find(detail => {
        return detail.label === "City Size"
    }).data
    const POPULATION_SIZE = found.find(item => item.id==='POPULATION-SIZE')?.float_value || null
    const POPULATION_UA_CENTER_DENSITY = found.find(item => item.id==='POPULATION-UA-CENTER-DENSITY')?.float_value || null
    const POPULATION_UA_DENSITY = found.find(item => item.id==='POPULATION-UA-DENSITY')?.float_value || null
    
    citySize_list.push({
        id: counter,
        POPULATION_SIZE,
        POPULATION_UA_CENTER_DENSITY,
        POPULATION_UA_DENSITY,
        city_id: counter
    })
    counter ++;
    }
    
);

fs.writeFileSync('./data/seed_data/citySize_seeds.json', JSON.stringify(citySize_list))
