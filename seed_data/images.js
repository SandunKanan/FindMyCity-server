const fs = require('fs')

const image_seeds = JSON.parse(fs.readFileSync('./data/seed_data/updated_image_seeds.json'))

module.exports = image_seeds;
