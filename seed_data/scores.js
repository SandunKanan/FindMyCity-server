const fs = require('fs')

const score_seeds = JSON.parse(fs.readFileSync('./data/seed_data/scores_seeds.json'))

module.exports = score_seeds