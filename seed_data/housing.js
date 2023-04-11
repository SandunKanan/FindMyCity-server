const fs = require('fs')

const housing_seeds = JSON.parse(fs.readFileSync('./data/seed_data/housing_seeds.json'))

module.exports = housing_seeds