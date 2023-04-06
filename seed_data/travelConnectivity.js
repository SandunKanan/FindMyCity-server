const fs = require('fs')

const travelConnectivity_seeds = JSON.parse(fs.readFileSync('./data/seed_data/travelConnectivity_seeds.json'))

module.exports = travelConnectivity_seeds