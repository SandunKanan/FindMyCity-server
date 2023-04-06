const fs = require('fs')

const enviroQuality_seeds = JSON.parse(fs.readFileSync('./data/seed_data/enviroQuality_seeds.json'))

module.exports = enviroQuality_seeds