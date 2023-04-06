const fs = require('fs')

const city_list = JSON.parse(fs.readFileSync('./data/urban_area_list.json'))

const commute_seed = []

let counter = 1
city_list.forEach(city => {
    const nextCity = city.toLowerCase().replaceAll(",", "").replaceAll(" ", "-").replaceAll(".", "")
    const details = JSON.parse(fs.readFileSync(`./data/cityDetails/${nextCity}_details.json`))
    details.pop()
    const found = details.find(detail => {
        return detail.label === "Commute"
    })?.data
     if (!found) {
        commute_seed.push({
            id: counter,
            HUMAN_CITIES_PAGE_URLS: null,
            TRAFFIC_INDEX_TELESCORE: null,
            city_id: counter
        })
        counter ++;
        return
    }
    if (counter===1) {
        console.log(found.find(item => item.id==='TRAFFIC-INDEX-TELESCORE')?.float_value)
    }

    const HUMAN_CITIES_PAGE_URLS = found.find(item => item.id==='HUMAN-CITIES-PAGE-URLS')?.url_value || null
    const TRAFFIC_INDEX_TELESCORE = found.find(item => item.id==='TRAFFIC-INDEX-TELESCORE')?.float_value || null
    
    commute_seed.push({
        id: counter,
        HUMAN_CITIES_PAGE_URLS,
        TRAFFIC_INDEX_TELESCORE,
        city_id: counter
    })
    counter ++;
    }
    
);

fs.writeFileSync('./data/seed_data/commute_seeds.json', JSON.stringify(commute_seed))


// .createTable('commute', table => {
//     table.increments('id').primary();
//     table.string("HUMAN_CITIES_PAGE_URLS")
//     table.decimal("TRAFFIC_INDEX_TELESCORE")
//     table.integer('city_id')

// {
//     "data": [
//       {
//         "id": "HUMAN-CITIES-PAGE-URLS",
//         "label": "Human city page",
//         "type": "url",
//         "url_value": "http://cities.human.co/details/Spain/Barcelona"
//       },
//       {
//         "float_value": 0.8416,
//         "id": "TRAFFIC-INDEX-TELESCORE",
//         "label": "Traffic handling [Teleport score]",
//         "type": "float"
//       }
//     ],
//     "id": "TRAFFIC",
//     "label": "Commute"
//   },