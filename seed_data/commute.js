const fs = require('fs')

const commute_seeds = JSON.parse(fs.readFileSync('./data/seed_data/commute_seeds.json'))

module.exports = commute_seeds

