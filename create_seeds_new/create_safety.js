const fs = require('fs')

const city_list = JSON.parse(fs.readFileSync('./data/urban_area_list.json'))

const safety_seed = []

let counter = 1
city_list.forEach(city => {
    const nextCity = city.toLowerCase().replaceAll(",", "").replaceAll(" ", "-").replaceAll(".", "")
    const details = JSON.parse(fs.readFileSync(`./data/cityDetails/${nextCity}_details.json`))
    details.pop()
    const found = details.find(detail => {
        return detail.label === "Safety"
    })?.data
     if (!found) {
        safety_seed.push({
            id: counter,
            CRIME_RATE_TELESCORE: null,
            GUN_DEATH_RATE: null,
            GUN_DEATH_SCORE_TELESCORE: null,
            GUN_OWNERSHIP: null,
            GUN_OWNERSHIP_SCORE_TELESCORE: null,
            GUN_SCORE_TELESCORE: null,
            city_id: counter
        })
        counter ++;
        return
    }
    if (counter===2) {
        console.log(found.find(item => item.id==='CRIME-RATE-TELESCORE')?.float_value)
    }

    const CRIME_RATE_TELESCORE = found.find(item => item.id==='CRIME-RATE-TELESCORE')?.float_value || null
    const GUN_DEATH_RATE = found.find(item => item.id==='GUN-DEATH-RATE')?.int_value || null
    const GUN_DEATH_SCORE_TELESCORE = found.find(item => item.id==='GUN-DEATH-SCORE-TELESCORE')?.float_value || null
    const GUN_OWNERSHIP = found.find(item => item.id==='GUN-OWNERSHIP')?.int_value || null
    const GUN_OWNERSHIP_SCORE_TELESCORE = found.find(item => item.id==='GUN-OWNERSHIP-SCORE-TELESCORE')?.float_value || null
    const GUN_SCORE_TELESCORE = found.find(item => item.id==='GUN-SCORE-TELESCORE')?.float_value || null
    
    safety_seed.push({
        id: counter,
        CRIME_RATE_TELESCORE,
        GUN_DEATH_RATE,
        GUN_DEATH_SCORE_TELESCORE,
        GUN_OWNERSHIP,
        GUN_OWNERSHIP_SCORE_TELESCORE,
        GUN_SCORE_TELESCORE,
        city_id: counter
    })
    counter ++;
    }
    
);

fs.writeFileSync('./data/seed_data/safety_seeds.json', JSON.stringify(safety_seed))


// .createTable('safety', table => {
//     table.increments('id').primary();
//     table.decimal("CRIME_RATE_TELESCORE")
//     table.integer("GUN_DEATH_RATE")
//     table.decimal("GUN_DEATH_SCORE_TELESCORE")
//     table.integer("GUN_OWNERSHIP")
//     table.decimal("GUN_OWNERSHIP_SCORE_TELESCORE")
//     table.decimal("GUN_SCORE_TELESCORE")
//     table.integer('city_id')

// {
//     "data": [
//       {
//         "float_value": 0.5357,
//         "id": "CRIME-RATE-TELESCORE",
//         "label": "Crime rate [Teleport score]",
//         "type": "float"
//       },
//       {
//         "id": "GUN-DEATH-RATE",
//         "int_value": 0.62,
//         "label": "Gun-related deaths per 100,000 residents per year",
//         "type": "int"
//       },
//       {
//         "float_value": 0.9847,
//         "id": "GUN-DEATH-SCORE-TELESCORE",
//         "label": "Lack of gun related deaths [Teleport score]",
//         "type": "float"
//       },
//       {
//         "id": "GUN-OWNERSHIP",
//         "int_value": 10.4,
//         "label": "Guns per 100 residents",
//         "type": "int"
//       },
//       {
//         "float_value": 0.9458,
//         "id": "GUN-OWNERSHIP-SCORE-TELESCORE",
//         "label": "Lack of guns [Teleport score]",
//         "type": "float"
//       },
//       {
//         "float_value": 0.9653,
//         "id": "GUN-SCORE-TELESCORE",
//         "label": "Lack of guns and gun-related deaths [Teleport score]",
//         "type": "float"
//       }
//     ],
//     "id": "SAFETY",
//     "label": "Safety"