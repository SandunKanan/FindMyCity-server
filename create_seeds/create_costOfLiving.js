const fs = require('fs')

const city_list = JSON.parse(fs.readFileSync('./data/urban_area_list.json'))

const costOfLiving_seed = []

let counter = 1
city_list.forEach(city => {
    const nextCity = city.toLowerCase().replaceAll(",", "").replaceAll(" ", "-").replaceAll(".", "")
    const details = JSON.parse(fs.readFileSync(`./data/cityDetails/${nextCity}_details.json`))
    details.pop()
    const found = details.find(detail => {
        return detail.label === "Cost of Living"
    })?.data
     if (!found) {
        costOfLiving_seed.push({
            id: counter,
            COST_APPLES: null,
            COST_BREAD: null,
            COST_CAPPUCCINO: null,
            COST_CINEMA: null,
            COST_FITNESS_CLUB: null,
            COST_IMPORT_BEER: null,
            COST_PUBLIC_TRANSPORT: null,
            COST_TAXI: null,
            RESTAURANT_PRICE_INDEX: null,
            city_id: counter
        })
        counter ++;
        return
    }
    if (counter===2) {
        console.log(found.find(item => item.id==='COST-APPLES')?.currency_dollar_value)
    }

    const COST_APPLES = found.find(item => item.id==='COST-APPLES')?.currency_dollar_value || null
    const COST_BREAD = found.find(item => item.id==='COST-BREAD')?.currency_dollar_value || null
    const COST_CAPPUCCINO = found.find(item => item.id==='COST-CAPPUCCINO')?.currency_dollar_value || null
    const COST_CINEMA = found.find(item => item.id==='COST-CINEMA')?.currency_dollar_value || null
    const COST_FITNESS_CLUB = found.find(item => item.id==='COST-FITNESS-CLUB')?.currency_dollar_value || null
    const COST_IMPORT_BEER = found.find(item => item.id==='COST-IMPORT-BEER')?.currency_dollar_value || null
    const COST_PUBLIC_TRANSPORT = found.find(item => item.id==='COST-PUBLIC-TRANSPORT')?.currency_dollar_value || null
    const COST_TAXI = found.find(item => item.id==='COST-TAXI')?.currency_dollar_value || null
    const RESTAURANT_PRICE_INDEX = found.find(item => item.id==='RESTAURANT-PRICE-INDEX')?.currency_dollar_value || null
    
    costOfLiving_seed.push({
        id: counter,
        COST_APPLES,
        COST_BREAD,
        COST_CAPPUCCINO,
        COST_CINEMA,
        COST_FITNESS_CLUB,
        COST_IMPORT_BEER,
        COST_PUBLIC_TRANSPORT,
        COST_TAXI,
        RESTAURANT_PRICE_INDEX,
        city_id: counter
    })
    counter ++; 
    }
    
);

fs.writeFileSync('./data/seed_data/costOfLiving_seeds.json', JSON.stringify(costOfLiving_seed))


// .createTable('cost_of_living', (table) => {
//     table.increments('id').primary();
//     table.decimal("COST_APPLES")
//     table.decimal("COST_BREAD")
//     table.decimal("COST_CAPPUCCINO")
//     table.decimal("COST_CINEMA")
//     table.decimal("COST_FITNESS_CLUB")
//     table.decimal("COST_IMPORT_BEER")
//     table.decimal("COST_PUBLIC_TRANSPORT")
//     table.decimal("COST_TAXI")
//     table.decimal("RESTAURANT_PRICE_INDEX")
//     table.integer('city_id')