const fs = require('fs')

const continent_seeds = JSON.parse(fs.readFileSync('./data/seed_data/continent_seeds.json'))

module.exports = continent_seeds