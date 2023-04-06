const fs = require('fs')

const perc_seeds = JSON.parse(fs.readFileSync('./data/seed_data/percentile_seeds.json'))

module.exports = perc_seeds