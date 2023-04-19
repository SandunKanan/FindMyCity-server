const fs = require('fs')

const city_list = JSON.parse(fs.readFileSync('./data/urban_area_list.json'))

const enviroQuality_seed = []

let counter = 1
city_list.forEach(city => {
    const nextCity = city.toLowerCase().replaceAll(",", "").replaceAll(" ", "-").replaceAll(".", "")
    const details = JSON.parse(fs.readFileSync(`./data/cityDetails/${nextCity}_details.json`))
    details.pop()
    const found = details.find(detail => {
        return detail.label === "Environmental Quality"
    })?.data
     if (!found) {
        enviroQuality_seed.push({
            id: counter,
            AIR_POLLUTION_TELESCORE: null,
            CLEANLINESS_TELESCORE: null,
            DRINKING_WATER_QUALITY_TELESCORE: null,
            URBAN_GREENERY_TELESCORE: null,
            city_id: counter
        })
        counter ++;
        return
    }
    if (counter===2) {
        console.log(found.find(item => item.id==='AIR-POLLUTION-TELESCORE')?.float_value)
    }

    const AIR_POLLUTION_TELESCORE = found.find(item => item.id==='AIR-POLLUTION-TELESCORE')?.float_value || null
    const CLEANLINESS_TELESCORE = found.find(item => item.id==='CLEANLINESS-TELESCORE')?.float_value || null
    const DRINKING_WATER_QUALITY_TELESCORE = found.find(item => item.id==='DRINKING-WATER-QUALITY-TELESCORE')?.float_value || null
    const URBAN_GREENERY_TELESCORE = found.find(item => item.id==='URBAN-GREENERY-TELESCORE')?.float_value || null
    
    enviroQuality_seed.push({
        id: counter,
        AIR_POLLUTION_TELESCORE,
        CLEANLINESS_TELESCORE,
        DRINKING_WATER_QUALITY_TELESCORE,
        URBAN_GREENERY_TELESCORE,
        city_id: counter
    })
    counter ++;
    }
    
);

fs.writeFileSync('./data/seed_data/enviroQuality_seeds.json', JSON.stringify(enviroQuality_seed))


// .createTable('environmental_quality', table => {
//     table.increments('id').primary();
//     table.decimal("AIR_POLLUTION_TELESCORE")
//     table.decimal("CLEANLINESS_TELESCORE")
//     table.decimal("DRINKING_WATER_QUALITY_TELESCORE")
//     table.decimal("URBAN_GREENERY_TELESCORE")
//     table.integer('city_id')

// {
//     "data": [
//       {
//         "float_value": 0.3119,
//         "id": "AIR-POLLUTION-TELESCORE",
//         "label": "Air quality [Teleport score]",
//         "type": "float"
//       },
//       {
//         "float_value": 0.5795,
//         "id": "CLEANLINESS-TELESCORE",
//         "label": "Cleanliness [Teleport score]",
//         "type": "float"
//       },
//       {
//         "float_value": 0.1839,
//         "id": "DRINKING-WATER-QUALITY-TELESCORE",
//         "label": "Drinking water quality [Teleport score]",
//         "type": "float"
//       },
//       {
//         "float_value": 0.3909,
//         "id": "URBAN-GREENERY-TELESCORE",
//         "label": "Urban greenery [Teleport score]",
//         "type": "float"
//       }
//     ],
//     "id": "POLLUTION",
//     "label": "Environmental Quality"
//   },