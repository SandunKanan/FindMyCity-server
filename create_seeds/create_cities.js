const fs = require('fs')

const city_list = JSON.parse(fs.readFileSync('./data/urban_area_list.json'))

const city_seeds = city_list.map(city => {
    return {
        city_id: city_list.indexOf(city) + 1,
        name: city
    }
})

fs.writeFileSync('./data/seed_data/city_seeds.json', JSON.stringify(city_seeds))
