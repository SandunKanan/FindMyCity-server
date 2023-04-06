const fs = require('fs')

const costOfLiving_seeds = JSON.parse(fs.readFileSync('./data/seed_data/costOfLiving_seeds.json'))

module.exports = costOfLiving_seeds