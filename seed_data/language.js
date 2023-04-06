const fs = require('fs')

const language_seeds = JSON.parse(fs.readFileSync('./data/seed_data/language_seeds.json'))

module.exports = language_seeds