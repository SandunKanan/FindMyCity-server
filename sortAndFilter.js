const fs = require('fs')

monthlyCosts = JSON.parse(fs.readFileSync('./data/newDetails/monthlyCostOfLiving.json'))

monthlyCosts.sort((city1, city2) => {
    return (city2.monthlyCosts.find(item => item.label==="Earning to Cost ratio").value - 
    city1.monthlyCosts.find(item => item.label==="Earning to Cost ratio").value )
})

ratios = monthlyCosts.map(city => {
    return { city: city.city ,...city.monthlyCosts.find(item => item.label==="Earning to Cost ratio")}
})

// fs.writeFileSync('./data/newDetails/sortedCities.json', JSON.stringify(monthlyCosts))
fs.writeFileSync('./data/newDetails/ratios.json', JSON.stringify(ratios))
