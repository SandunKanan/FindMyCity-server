const fs = require('fs')

const slugs = JSON.parse(fs.readFileSync("./data/newDetails/allSlug.json"))

const countries = []
const continents = []
slugs.forEach(slug => {
    if (!countries.find(country => country === slug._links['ua:countries'][0].name)) {
        countries.push(slug._links['ua:countries'][0].name)
    }
    if (!continents.find(continent => continent === slug._links['ua:continent'].name)) {
        continents.push(slug._links['ua:continent'].name)
    }
    
})

const sCountries = countries.sort()
const sContinents = continents.sort()

const country_seed = sCountries.map(country => {
    return {id: sCountries.indexOf(country)+1, country}
})
const continent_seed = sContinents.map(continent => {
    return {id: sContinents.indexOf(continent)+1, continent}
})

fs.writeFileSync('./data/seed_data/country_seeds.json', JSON.stringify(country_seed))
fs.writeFileSync('./data/seed_data/continent_seeds.json', JSON.stringify(continent_seed))