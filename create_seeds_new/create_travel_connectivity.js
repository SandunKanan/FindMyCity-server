const fs = require('fs')

const city_list = JSON.parse(fs.readFileSync('./data/urban_area_list.json'))

const travelConnectivity_seed = []

let counter = 1
city_list.forEach(city => {
    const nextCity = city.toLowerCase().replaceAll(",", "").replaceAll(" ", "-").replaceAll(".", "")
    const details = JSON.parse(fs.readFileSync(`./data/cityDetails/${nextCity}_details.json`))
    details.pop()
    const found = details.find(detail => {
        return detail.label === "Travel Connectivity"
    })?.data
     if (!found) {
        travelConnectivity_seed.push({
            id: counter,
            AIRPORT_HUB_INDEX_DETAIL: null,
            AIRPORT_HUB_TELESCORE: null,
            TRAIN_TRANSPORT_TELESCORE: null,
            city_id: counter
        })
        counter ++;
        return
    }
    if (counter===10) {
        console.log(found.find(item => item.id==='AIRPORT-HUB-INDEX-DETAIL')?.int_value)
    }

    const AIRPORT_HUB_INDEX_DETAIL = found.find(item => item.id==='AIRPORT-HUB-INDEX-DETAIL')?.int_value || null
    const AIRPORT_HUB_TELESCORE = found.find(item => item.id==='AIRPORT-HUB-TELESCORE')?.float_value || null
    const TRAIN_TRANSPORT_TELESCORE = found.find(item => item.id==='TRAIN-TRANSPORT-TELESCORE')?.float_value || null
    
    travelConnectivity_seed.push({
        id: counter,
        AIRPORT_HUB_INDEX_DETAIL,
        AIRPORT_HUB_TELESCORE,
        TRAIN_TRANSPORT_TELESCORE,
        city_id: counter
    })
    counter ++;
    }
    
);

fs.writeFileSync('./data/seed_data/travelConnectivity_seeds.json', JSON.stringify(travelConnectivity_seed))


// .createTable('travel_connectivity', table => {
//     table.increments('id').primary();
//     table.integer("AIRPORT_HUB_INDEX_DETAIL")
//     table.decimal("AIRPORT_HUB_TELESCORE")
//     table.decimal("TRAIN_TRANSPORT_TELESCORE")
//     table.integer('city_id')

// {
//     "data": [
//       {
//         "id": "AIRPORT-HUB-INDEX-DETAIL",
//         "int_value": 163,
//         "label": "Airport hub",
//         "type": "int"
//       },
//       {
//         "float_value": 0.7057,
//         "id": "AIRPORT-HUB-TELESCORE",
//         "label": "Airport hub [Teleport score]",
//         "type": "float"
//       },
//       {
//         "float_value": 0.4555,
//         "id": "TRAIN-TRANSPORT-TELESCORE",
//         "label": "Intercity train connectivity [Teleport score]",
//         "type": "float"
//       }
//     ],
//     "id": "TRAVEL-CONNECTIVITY",
//     "label": "Travel Connectivity"
//   }