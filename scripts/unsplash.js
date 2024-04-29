const axios = require('axios')

BASE_URL = "https://api.unsplash.com"
ENDPOINT = "/photos/random"

total_url = `${BASE_URL}${ENDPOINT}`
console.log(total_url)

axios.get(url).then(resp => {
    console.log(resp)
    return;
}).catch(error => console.error(error));
