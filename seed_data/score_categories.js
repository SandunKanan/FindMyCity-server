const fs = require('fs')

const scoreCategory_seeds = JSON.parse(fs.readFileSync('./data/seed_data/category_seeds.json'))

module.exports = scoreCategory_seeds