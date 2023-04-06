const fs = require('fs')

const healthcare_seeds = JSON.parse(fs.readFileSync('./data/seed_data/healthcare_seeds.json'))

module.exports = healthcare_seeds