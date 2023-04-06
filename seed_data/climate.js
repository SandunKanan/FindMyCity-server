const fs = require('fs')

const climate_seeds = JSON.parse(fs.readFileSync('./data/seed_data/climate_seeds.json'))

module.exports = climate_seeds