const fs = require('fs')

const city_list = JSON.parse(fs.readFileSync('./data/urban_area_list.json'))

const housing_seed = []

let counter = 1
city_list.forEach(city => {
    const nextCity = city.toLowerCase().replaceAll(",", "").replaceAll(" ", "-").replaceAll(".", "")
    const details = JSON.parse(fs.readFileSync(`./data/cityDetails/${nextCity}_details.json`))
    details.pop()
    const found = details.find(detail => {
        return detail.label === "Housing"
    })?.data
     if (!found) {
        housing_seed.push({
            id: counter,
            APARTMENT_RENT_LARGE: null,
            APARTMENT_RENT_MEDIUM: null,
            APARTMENT_RENT_SMALL: null,
            city_id: counter
        })
        counter ++;
        return
    }
    if (counter===2) {
        console.log(found.find(item => item.id==='APARTMENT-RENT-LARGE')?.currency_dollar_value)
    }

    const APARTMENT_RENT_LARGE = found.find(item => item.id==='APARTMENT-RENT-LARGE')?.currency_dollar_value || null
    const APARTMENT_RENT_MEDIUM = found.find(item => item.id==='APARTMENT-RENT-MEDIUM')?.currency_dollar_value || null
    const APARTMENT_RENT_SMALL = found.find(item => item.id==='APARTMENT-RENT-SMALL')?.currency_dollar_value || null
    
    housing_seed.push({
        id: counter,
        APARTMENT_RENT_LARGE,
        APARTMENT_RENT_MEDIUM,
        APARTMENT_RENT_SMALL,
        city_id: counter
    })
    counter ++;
    }
    
);

fs.writeFileSync('./data/seed_data/housing_seeds.json', JSON.stringify(housing_seed))


   