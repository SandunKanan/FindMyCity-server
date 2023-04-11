const fs = require('fs')

const city_list = JSON.parse(fs.readFileSync('./data/urban_area_list.json'))
const slugs = JSON.parse(fs.readFileSync("./data/newDetails/allSlug.json"))
const country_seeds = JSON.parse(fs.readFileSync('./data/seed_data/country_seeds.json'))
const continent_seeds = JSON.parse(fs.readFileSync('./data/seed_data/continent_seeds.json'))

let counter = 0;
const city_seeds = city_list.map(city => {
    countryId = country_seeds.find(country => country.country === city)
    slugFound = slugs.find(slug => slug.name === city)
    return {
        city_id: city_list.indexOf(city) + 1,
        name: city,
        country_id: country_seeds.find(countryItem => countryItem.country === slugFound._links['ua:countries'][0].name).id,
        continent_id: continent_seeds.find(contItem => contItem.continent ===slugFound._links['ua:continent'].name).id
    }
})


fs.writeFileSync('./data/seed_data/city_seeds.json', JSON.stringify(city_seeds))
