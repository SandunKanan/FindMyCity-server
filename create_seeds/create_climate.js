const fs = require('fs')

const city_list = JSON.parse(fs.readFileSync('./data/urban_area_list.json'))

const climate_seed = []

let counter = 1
city_list.forEach(city => {
    const nextCity = city.toLowerCase().replaceAll(",", "").replaceAll(" ", "-").replaceAll(".", "")
    const details = JSON.parse(fs.readFileSync(`./data/cityDetails/${nextCity}_details.json`))
    details.pop()
    const found = details.find(detail => {
        return detail.label === "Climate"
    })?.data
     if (!found) {
        climate_seed.push({
            id: counter,
            WEATHER_AV_DAY_LENGTH: null,
            WEATHER_AVERAGE_HIGH: null,
            WEATHER_AVERAGE_LOW: null,
            WEATHER_SUNSHINE_AMOUNT: null,
            WEATHER_TYPE: null,
            city_id: counter
        })
        counter ++;
        return
    }

    const WEATHER_AV_DAY_LENGTH = found.find(item => item.id==='WEATHER-AV-DAY-LENGTH')?.float_value || null
    const WEATHER_AVERAGE_HIGH = found.find(item => item.id==='WEATHER-AVERAGE-HIGH')?.string_value || null
    const WEATHER_AVERAGE_LOW = found.find(item => item.id==='WEATHER-AVERAGE-LOW')?.string_value || null
    const WEATHER_SUNSHINE_AMOUNT = found.find(item => item.id==='WEATHER-SUNSHINE-AMOUNT')?.float_value || null
    const WEATHER_TYPE = found.find(item => item.id==='WEATHER-TYPE')?.float_value || null
    
    climate_seed.push({
        id: counter,
        WEATHER_AV_DAY_LENGTH,
        WEATHER_AVERAGE_HIGH,
        WEATHER_AVERAGE_LOW,
        WEATHER_SUNSHINE_AMOUNT,
        WEATHER_TYPE,
        city_id: counter
    })
    counter ++;
    }
    
);

fs.writeFileSync('./data/seed_data/climate_seeds.json', JSON.stringify(climate_seed))

// .createTable('climate', (table) => {
//     table.increments('id').primary();
//     table.decimal('WEATHER_AV_DAY_LENGTH',10,5);
//     table.string('WEATHER_AVERAGE_HIGH');
//     table.string('WEATHER_AVERAGE_LOW');
//     table.decimal('WEATHER_SUNSHINE_AMOUNT');
//     table.decimal("WEATHER_TYPE");
//     table.integer('city_id')
// })

   