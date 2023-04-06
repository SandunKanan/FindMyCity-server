const fs = require('fs')

const safety_seeds = JSON.parse(fs.readFileSync('./data/seed_data/safety_seeds.json'))

module.exports = safety_seeds