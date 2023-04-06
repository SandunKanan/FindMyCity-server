const fs = require('fs')

const city_list = JSON.parse(fs.readFileSync('./data/urban_area_list.json'))

const heatlhcare_seed = []

let counter = 1
city_list.forEach(city => {
    const nextCity = city.toLowerCase().replaceAll(",", "").replaceAll(" ", "-").replaceAll(".", "")
    const details = JSON.parse(fs.readFileSync(`./data/cityDetails/${nextCity}_details.json`))
    details.pop()
    const found = details.find(detail => {
        return detail.label === "Healthcare"
    })?.data
     if (!found) {
        heatlhcare_seed.push({
            id: counter,
            HEALTHCARE_COST_TELESCORE: null,
            HEALTHCARE_LIFE_EXPECTANCY: null,
            HEALTHCARE_LIFE_EXPECTANCY_TELESCORE: null,
            HEALTHCARE_QUALITY_TELESCORE: null,
            city_id: counter
        })
        counter ++;
        return
    }

    const HEALTHCARE_COST_TELESCORE = found.find(item => item.id==='HEALTHCARE-COST-TELESCORE')?.float_value || null
    const HEALTHCARE_LIFE_EXPECTANCY = found.find(item => item.id==='HEALTHCARE-LIFE-EXPECTANCY')?.float_value || null
    const HEALTHCARE_LIFE_EXPECTANCY_TELESCORE = found.find(item => item.id==='HEALTHCARE-LIFE-EXPECTANCY-TELESCORE')?.float_value || null
    const HEALTHCARE_QUALITY_TELESCORE = found.find(item => item.id==='HEALTHCARE-QUALITY-TELESCORE')?.float_value || null

    heatlhcare_seed.push({
        id: counter,
        HEALTHCARE_COST_TELESCORE,
        HEALTHCARE_LIFE_EXPECTANCY,
        HEALTHCARE_LIFE_EXPECTANCY_TELESCORE,
        HEALTHCARE_QUALITY_TELESCORE,
        city_id: counter
    })
    counter ++;
    }
    
);

fs.writeFileSync('./data/seed_data/heatlhcare_seeds.json', JSON.stringify(heatlhcare_seed))


// .createTable('healthcare', (table) => {
//     table.increments('id').primary();
//     table.decimal("HEALTHCARE_COST_TELESCORE");
//     table.decimal("HEALTHCARE_LIFE_EXPECTANCY");
//     table.decimal("HEALTHCARE_LIFE_EXPECTANCY_TELESCORE");
//     table.decimal("HEALTHCARE_QUALITY_TELESCORE");
//     table.integer('city_id')