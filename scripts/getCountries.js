const fs = require('fs')

const slugs = JSON.parse(fs.readFileSync("./data/newDetails/allSlug.json"))
const city_list = JSON.parse(fs.readFileSync('./data/urban_area_list.json'))

console.log(slugs[1].name)

slugs.forEach(slug => {
    console.log(slug.name)
})