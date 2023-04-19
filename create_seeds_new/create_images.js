const fs = require('fs')

const imageData = JSON.parse(fs.readFileSync('./data/newDetails/allImages.json'))

console.log(imageData.length)
const image_seed = []
let counter = 1
imageData.forEach(city => {
    const id = counter;
    const mob_url = city.photos[0]?.image?.mobile || null;
    const web_url = city.photos[0]?.image?.web || null;
    const city_id = counter

    newObj = {
        id, mob_url, web_url, city_id
    }
    image_seed.push(newObj)
  
      counter ++;
})
console.log(image_seed[100])

fs.writeFileSync('./data/seed_data/image_seeds.json', JSON.stringify(image_seed))
