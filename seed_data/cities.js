const fs = require('fs')

const city_seeds = JSON.parse(fs.readFileSync('./data/seed_data/city_seeds.json'))

module.exports = city_seeds