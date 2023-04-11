const fs = require('fs')

const summary_seeds = JSON.parse(fs.readFileSync('./data/seed_data/summary_seeds.json'))

module.exports = summary_seeds