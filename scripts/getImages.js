const axios = require('axios')
const fs = require('fs')

const city_list = JSON.parse(fs.readFileSync("./data/urban_area_list.json"))

const allRequests = city_list.map(city => {
    const nextCity = city.toLowerCase().replaceAll(",", "").replaceAll(" ", "-").replaceAll(".", "").replaceAll("galway", "gaillimh")
    const url = `https://api.teleport.org/api/urban_areas/slug:${nextCity}/images/`
    return axios.get(url)
        .then(resp => {
            return JSON.stringify(resp.data)
        })    
})

Promise.all(allRequests)
    .then(allImages => {
        fs.writeFileSync("./data/newDetails/allImages.json", JSON.stringify(allImages))
    })