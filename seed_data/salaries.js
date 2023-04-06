const fs = require('fs')

const salary_seeds = JSON.parse(fs.readFileSync('./data/seed_data/salary_seeds.json'))

module.exports = salary_seeds