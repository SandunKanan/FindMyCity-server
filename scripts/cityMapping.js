const fs = require('fs')

const city_list = JSON.parse(fs.readFileSync("./data/urban_area_list.json"))

const city_mapping = {}
city_list.forEach(city => {
    city_mapping[city.toLowerCase().replaceAll(",", "").replaceAll(" ", "-").replaceAll(".", "").replaceAll("galway", "gaillimh")] = city
})

fs.writeFileSync("./data/urban_area_mapping.json", JSON.stringify(city_mapping))