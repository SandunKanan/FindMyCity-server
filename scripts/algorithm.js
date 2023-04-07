const fs = require('fs')

// Average Cost of Living per Month = 
// (Apples * 4) + (Bread * 14) + (Cappuccino * 7) + (Movie ticket * 1.5) + 
// (Fitness club membership * 0.5) + (Beer * 5) + (Public transport * 22) + 
// (Lunch * 17) + (Taxi ride * 1.5) + (Restaurant meal * 4) 

city_list = [
    "Aarhus",
    "Adelaide",
    "Albuquerque",
    "Almaty",
    "Amsterdam",
    "Anchorage",
    "Andorra",
    "Ankara",
    "Asheville",
    "Asuncion",
    "Athens",
    "Atlanta",
    "Auckland",
    "Austin",
    "Baku",
    "Bali",
    "Baltimore",
    "Bangkok",
    "Barcelona",
    "Beijing",
    "Beirut",
    "Belfast",
    "Belgrade",
    "Belize City",
    "Bengaluru",
    "Bergen",
    "Berlin",
    "Bern",
    "Bilbao",
    "Birmingham",
    "Birmingham, AL",
    "Bogota",
    "Boise",
    "Bologna",
    "Bordeaux",
    "Boston",
    "Boulder",
    "Bozeman",
    "Bratislava",
    "Brighton",
    "Brisbane",
    "Bristol",
    "Brno",
    "Brussels",
    "Bucharest",
    "Budapest",
    "Buenos Aires",
    "Buffalo",
    "Cairo",
    "Calgary",
    "Cambridge",
    "Cape Town",
    "Caracas",
    "Cardiff",
    "Casablanca",
    "Charleston",
    "Charlotte",
    "Chattanooga",
    "Chennai",
    "Chiang Mai",
    "Chicago",
    "Chisinau",
    "Christchurch",
    "Cincinnati",
    "Cleveland",
    "Cluj-Napoca",
    "Cologne",
    "Colorado Springs",
    "Columbus",
    "Copenhagen",
    "Cork",
    "Curitiba",
    "Dallas",
    "Dar es Salaam",
    "Delhi",
    "Denver",
    "Des Moines",
    "Detroit",
    "Doha",
    "Dresden",
    "Dubai",
    "Dublin",
    "Dusseldorf",
    "Edinburgh",
    "Edmonton",
    "Eindhoven",
    "Eugene",
    "Florence",
    "Florianopolis",
    "Fort Collins",
    "Frankfurt",
    "Fukuoka",
    "Gdansk",
    "Geneva",
    "Gibraltar",
    "Glasgow",
    "Gothenburg",
    "Grenoble",
    "Guadalajara",
    "Guatemala City",
    "Halifax",
    "Hamburg",
    "Hannover",
    "Havana",
    "Helsinki",
    "Ho Chi Minh City",
    "Hong Kong",
    "Honolulu",
    "Houston",
    "Hyderabad",
    "Indianapolis",
    "Innsbruck",
    "Istanbul",
    "Jacksonville",
    "Jakarta",
    "Johannesburg",
    "Kansas City",
    "Karlsruhe",
    "Kathmandu",
    "Kiev",
    "Kingston",
    "Knoxville",
    "Krakow",
    "Kuala Lumpur",
    "Kyoto",
    "Lagos",
    "La Paz",
    "Las Palmas de Gran Canaria",
    "Las Vegas",
    "Lausanne",
    "Leeds",
    "Leipzig",
    "Lille",
    "Lima",
    "Lisbon",
    "Liverpool",
    "Ljubljana",
    "London",
    "Los Angeles",
    "Louisville",
    "Luxembourg",
    "Lviv",
    "Lyon",
    "Madison",
    "Madrid",
    "Malaga",
    "Malmo",
    "Managua",
    "Manchester",
    "Manila",
    "Marseille",
    "Medellin",
    "Melbourne",
    "Memphis",
    "Mexico City",
    "Miami",
    "Milan",
    "Milwaukee",
    "Minneapolis-Saint Paul",
    "Minsk",
    "Montevideo",
    "Montreal",
    "Moscow",
    "Mumbai", 
    "Munich",
    "Nairobi",
    "Nantes",
    "Naples",
    "Nashville",
    "New Orleans",
    "New York",
    "Nice",
    "Nicosia",
    "Oklahoma City",
    "Omaha",
    "Orlando",
    "Osaka",
    "Oslo",
    "Ottawa",
    "Oulu",
    "Oxford",
    "Palo Alto",
    "Panama",
    "Paris",
    "Perth",
    "Philadelphia",
    "Phnom Penh",
    "Phoenix",
    "Phuket",
    "Pittsburgh",
    "Portland, ME",
    "Portland, OR",
    "Porto",
    "Porto Alegre",
    "Prague",
    "Providence",
    "Quebec",
    "Quito",
    "Raleigh",
    "Reykjavik",
    "Richmond",
    "Riga",
    "Rio De Janeiro",
    "Riyadh",
    "Rochester",
    "Rome",
    "Rotterdam",
    "Saint Petersburg",
    "Salt Lake City",
    "San Antonio",
    "San Diego",
    "San Francisco Bay Area",
    "San Jose",
    "San Juan",
    "San Luis Obispo",
    "San Salvador",
    "Santiago",
    "Santo Domingo",
    "Sao Paulo",
    "Sarajevo",
    "Saskatoon",
    "Seattle",
    "Seoul",
    "Seville",
    "Shanghai",
    "Singapore",
    "Skopje",
    "Sofia",
    'st louis',
    "Stockholm",
    "Stuttgart",
    "Sydney",
    "Taipei",
    "Tallinn",
    "Tampa Bay Area",
    "Tampere",
    "Tartu",
    "Tashkent",
    "Tbilisi",
    "Tehran",
    "Tel Aviv",
    "The Hague",
    "Thessaloniki",
    "Tokyo",
    "Toronto",
    "Toulouse",
    "Tunis",
    "Turin",
    "Turku",
    "Uppsala",
    "Utrecht",
    "Valencia",
    "Valletta",
    "Vancouver",
    "Victoria",
    "Vienna",
    "Vilnius",
    "Warsaw",
    "Washington, D.C.",
    "Wellington",
    "Winnipeg",
    "Wroclaw",
    "Yerevan",
    "Zagreb",
    "Zurich"
  ]

const multipliers = {
    'A kilogram of Apples': 4,
    'Bread': 14,
    'A Cappuccino': 15,
    'Movie ticket': 1.5,
    'Monthly fitness club membership': 0.5,
    'A beer': 5,
    'Monthly public transport': 1,
    'Lunch': 15,
    '5km taxi ride': 1.5,
    'Price of a meal at a restaurant': 3
}

const scoreRanges = {
    1: [0, 2],
    2: [2, 2.5],
    3: [2.5, 2.9],
    4: [2.9, 3.3],
    5: [3.3, 3.7],
    6: [3.7, 4.1],
    7: [4.1, 4.5],
    8: [4.5, 5],
    9: [5, 7],
    10: [7, 100]
}

const ranges2 = [0, 2, 2.5, 2.9, 3.3, 3.7, 4.1, 4.5, 5, 7, 100]

const costOfLivingFactors = []

city_list.forEach((city) => {
    const nextCity = city.toLowerCase().replaceAll(",", "").replaceAll(" ", "-").replaceAll(".", "").replaceAll("Galway", "gaillimh")
    const costs = getCostOfLivingDetails(nextCity)
    const monthlyCosts = costs.map(factor => ({label: factor.label, cost: (factor.currency_dollar_value*multipliers[factor.label]*2)}))
    let totalOtherCost = 0
    monthlyCosts.forEach(factor => {
        totalOtherCost += factor.cost
    })
    monthlyCosts.push({label: 'totalOtherCosts', cost: totalOtherCost})
    rentCost = getRentCost(nextCity)
    if (rentCost) {
        monthlyCosts.push({label: 'averageRental', cost: rentCost})
        totalCost = rentCost + totalOtherCost
        monthlyCosts.push({label: 'TotalCost', cost: totalCost})
    } else console.log(`No rental data for ${city}`)
    const salaries = getSalaries(nextCity, "Software Engineer")
    if (salaries) {
        const salary_amount = salaries.salary_percentiles.percentile_25
        monthlyCosts.push({label: 'Salary', amount: salary_amount})
        monthlyCosts.push({label: 'Earning to Cost ratio', value: salary_amount/12/totalCost})
    } else console.log(`No salary data for ${city}`)
    costOfLivingFactors.push({city, monthlyCosts})
})

fs.writeFileSync('./data/newDetails/monthlyCostOfLiving.json', JSON.stringify(costOfLivingFactors))

function getCostOfLivingDetails(city) {
    const details = JSON.parse(fs.readFileSync(`./data/cityDetails/${city}_details.json`))
    costOfLivingData = details.find(item => (item.label==='Cost of Living')).data
    costOfLivingData.shift()
    return costOfLivingData
}

function getRentCost(city) {
    const details = JSON.parse(fs.readFileSync(`./data/cityDetails/${city}_details.json`))
    const rentals = details.find(item => (item.label==='Housing'))?.data
    let total = 0
    rentals?.forEach(dataObj => {
        if (dataObj.label !== 'Rent index [Teleport score]') {
            total += dataObj.currency_dollar_value
        }
    })
    return total && total/3
}


function getSalaries(city, job) {
    const details = JSON.parse(fs.readFileSync(`./data/cityDetails/${city}_details.json`))
    
    const salary_section = details.find(item => !!item.salaries).salaries
    const salary = salary_section?.find(item => {
        return item.job.title === job
    })
    // console.log(salary)
    return salary
}
