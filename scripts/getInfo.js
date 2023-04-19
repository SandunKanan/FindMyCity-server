const knex = require("knex")(require("../knexfile"));
const fs = require("fs")

const mappings = JSON.parse(fs.readFileSync("./mappings/urban_area_mapping.json"))

async function run(city) {
    try {
        const cityName =  mappings[city]

        const city_info = await knex("cities")
        .select({ city_name: "cities.name" }, "summaries.summary" , "countries.country", "images.mob_url", "images.web_url" ,"continents.continent", "summaries.total_score")
        .join("countries", { "countries.id": "cities.country_id" })
        .join("continents", { "continents.id": "cities.continent_id" })
        .join("images", {"images.city_id": "cities.city_id"})
        .join("summaries", {"summaries.city_id": "cities.city_id"})
        .where("cities.name", cityName)
        .first();
        
        const climate = await knex("cities")
        .select('WEATHER_AV_DAY_LENGTH', 'WEATHER_AVERAGE_HIGH', 'WEATHER_AVERAGE_LOW', 'WEATHER_SUNSHINE_AMOUNT', 'WEATHER_TYPE')
        .join("climate", {"climate.city_id": "cities.city_id"})
        .where("cities.name", cityName)
        .first();
        
        const healthcare = await knex("cities")
        .select("HEALTHCARE_COST_TELESCORE", "HEALTHCARE_LIFE_EXPECTANCY", "HEALTHCARE_LIFE_EXPECTANCY_TELESCORE", "HEALTHCARE_QUALITY_TELESCORE")
        .join("healthcare", {"healthcare.city_id": "cities.city_id"})
        .where("cities.name", cityName)
        .first();
        
        const language = await knex("cities")
        .join("language", {"language.city_id": "cities.city_id"})
        .where("cities.name", cityName)
        .first();
        
        const housing = await knex("cities")
        .join("housing", {"housing.city_id": "cities.city_id"})
        .where("cities.name", cityName)
        .first();

        const enviro = await knex("cities")
        .join("environmental_quality", {"environmental_quality.city_id": "cities.city_id"})
        .where("cities.name", cityName)
        .first();

        const safety = await knex("cities")
        .join("safety", {"safety.city_id": "cities.city_id"})
        .where("cities.name", cityName)
        .first();

        const travel = await knex("cities")
        .join("travel_connectivity", {"travel_connectivity.city_id": "cities.city_id"})
        .where("cities.name", cityName)
        .first();

        // create json obj
        const info = {city_info, climate, healthcare, language, housing, enviro, safety, travel}

        
        return info
  } catch (err) {
      throw err;
  }
}

// run('barcelona').then(resp => {
//   console.log(resp)
//   process.exit()
// })

module.exports = { run };