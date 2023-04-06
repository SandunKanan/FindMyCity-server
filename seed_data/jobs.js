const fs = require('fs')

const job_seeds = JSON.parse(fs.readFileSync('./data/seed_data/job_seeds.json'))

module.exports = job_seeds