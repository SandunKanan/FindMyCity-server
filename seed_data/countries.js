const fs = require('fs')

const country_seeds = JSON.parse(fs.readFileSync('./data/seed_data/country_seeds.json'))

module.exports = country_seeds