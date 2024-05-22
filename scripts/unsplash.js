const axios = require('axios')
const fs = require('fs')

BASE_URL = "https://api.unsplash.com"
ENDPOINT = "/photos/random?client_id=eK1BVfzoEtzu84Wo7BOZFd7MeJdqDzbhuvK2tfp1hyw"

total_url = `${BASE_URL}${ENDPOINT}`
console.log(total_url)

axios.get(total_url).then(resp => {
    // fs.writeFileSync("./data/unsplash/firstresp.json", )
    pic_urls = resp.data.urls
    console.log(pic_urls)

}).catch(error => {
    console.error("error")
    console.log(error)
});
