const fs = require('fs')

const citySize_seeds = JSON.parse(fs.readFileSync('./data/seed_data/citySize_seeds.json'))

module.exports = citySize_seeds