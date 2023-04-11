const knex = require("knex")(require("../knexfile"));
const fs = require("fs")

// const [ratio, setRatio] = useState(false)

const mapping = {
  cleanAir: "AIR_POLLUTION_TELESCORE",
  cleanWater: "DRINKING_WATER_QUALITY_TELESCORE",
  healthcare: "Healthcare",
  carFree: "Travel Connectivity",
  edu: "Education",
  internet: "Internet Access",
  tolerant: "Tolarance",
  smallCity: "smallScore",
  midSize: "medScore",
  largeCity: "largeScore",
  lowTraffic: "Commute",
  culture: "Leisure & Culture",
  costLiving: "Cost of Living",
  costRent: "Housing",
  ratio: "Safety",
  enviroQuality: "Environmental Quality",
  lowTaxes: "Taxation",
  lowCrime: "Safety",
}

const revMapping = {
  "AIR_POLLUTION_TELESCORE": "cleanAir",
  "DRINKING_WATER_QUALITY_TELESCORE": "cleanWater",
  "Healthcare": "healthcare",
  "Travel Connectivity": "carFree",
  "Education": "edu",
  "Internet Access": "internet",
  "Tolerance": "tolerant",
  "smallScore": "smallCity",
  "medScore": "midSize",
  "largeScore": "largeCity",
  "Commute": "lowTraffic",
  "Leisure & Culture": "culture",
  "Cost of Living": "costLiving",
  "Housing": "costRent",
  "ratioScore": "ratio",
  "Environmental Quality": "enviroQuality",
  "Taxation": "lowTaxes",
  "Safety": "lowCrime",
}
const demo = { 
  budget: "5000",
  role: "C Level Executive",
  exp: "percentile_25",
  carFree: true,
  cleanAir: true,
  cleanWater: true,
  costLiving: true,
  costRent: true,
  healthcare: true,
  smallCity: false,
  midSize: true,
  largeCity: false,
  lowCrime: true,
  lowTraffic: true,
  ratio: true,
  edu: true,
  culture: true,
  internet: true,
  tolerant: true,
  enviroQuality: true
}

async function calculateRatio(city, role, exp) {
  const cost = await knex("cost_of_living")
  .select("TOTAL_COST")
  .join("cities", { "cost_of_living.city_id": "cities.city_id" })
  .where("cities.name", city)

  const total_cost = cost[0].TOTAL_COST

  const salary_ar = await knex("salaries")
  .select({salary: "salaries.amount"}, { percentile: "percentiles.name" }, { city_name: "cities.name" }, "summaries.summary" , "countries.country", "images.mob_url" ,"continents.continent", "jobs.title")
  .join("cities", { "salaries.city_id": "cities.city_id" })
  .join("countries", { "countries.id": "cities.country_id" })
  .join("continents", { "continents.id": "cities.continent_id" })
  .join("images", {"images.city_id": "cities.city_id"})
  .join("summaries", {"summaries.city_id": "cities.city_id"})
  .join("jobs", { "salaries.job_id": "jobs.job_id" })
  .join("percentiles", { "salaries.percentile_id": "percentiles.percentile_id" })
  .where({ "jobs.title": role })
  .andWhere({ "percentiles.name": exp })
  .andWhere("cities.name", city)
  .limit(5);
  const ratio = total_cost ? salary_ar[0].salary/total_cost/12 : null
  const data  = {...salary_ar[0], total_cost, ratio}
  return data
  }

function calculateTotalScore(scores, data) {
  let total_score = 0
  const goodCats = {}
  const badCats = {}
  scores.forEach(score => {
    if (data[revMapping[score.category]]) {
      total_score += Number(score.score)
      if (score.score>7) {
        goodCats[revMapping[score.category]] = score.score
      }
    }
    if (score.score<3 && (score.category !== 'smallScore' && score.category !== 'medScore' && score.category !== 'largeScore' && revMapping[score.category] !== undefined)) {
      badCats[revMapping[score.category]] = score.score
    }
  })
  return {total_score, goodCats, badCats}
}


async function run(data) {
    // get all scores data (maybe you only need ones where "true")

    try {
      const city_obj = await knex("cities");
      const city_list = city_obj.map(city => city.name);

      // calculated score for salary/cost of living ratio
      const ratio_data = await Promise.all(city_list.map(city => calculateRatio(city, data.role, data.exp)))
      const sorted_ratios = await Promise.all(ratio_data.sort((a, b) => a.ratio-b.ratio))
      const ratio_scores = await Promise.all(sorted_ratios.map(city => {
        return ({...city, ratio_score: city.ratio ? sorted_ratios.indexOf(city)/26.5 : 0})
      }))

      // get all scores
      const scoresList = [];
      await Promise.all(city_list.map(async (city) => {
          const scores = await knex("scores")
              .select("scores.score", "cities.name", "score_categories.category")
              .join("cities", { "scores.city_id": "cities.city_id" })
              .join("score_categories", { "scores.category_id": "score_categories.id" })
              .where("cities.name", city)
          // add environment scores
          const envScores = await knex("environmental_quality")
            .select("cities.name", 
              "environmental_quality.AIR_POLLUTION_TELESCORE", 
              "environmental_quality.DRINKING_WATER_QUALITY_TELESCORE",
              "environmental_quality.CLEANLINESS_TELESCORE")
            .join("cities", { "environmental_quality.city_id": "cities.city_id" })
            .where("cities.name", city)

          scores.push({score: (envScores[0].AIR_POLLUTION_TELESCORE*10).toFixed(2), name: city, category: 'AIR_POLLUTION_TELESCORE'})
          scores.push({score: (envScores[0].DRINKING_WATER_QUALITY_TELESCORE*10).toFixed(2), name: city,category: 'DRINKING_WATER_QUALITY_TELESCORE'})
          scores.push({score: (envScores[0].CLEANLINESS_TELESCORE*10).toFixed(2), name: city, category: 'CLEANLINESS_TELESCORE'})
      
          const pop = await knex("city_size")
            .select("city_size.POPULATION_SIZE")
            .join("cities", { "city_size.city_id": "cities.city_id" })
            .where("cities.name", city)
          const population = pop[0].POPULATION_SIZE

          scores.push({score: population<0.5 ? 10 : 0, name: city, category: 'smallScore'})
          scores.push({score: (population>0.5 && population<5) ? 10 : 0, name: city, category: 'medScore'})
          scores.push({score: population>5 ? 10 : 0, name: city, category: 'largeScore'})
          
          // get city data
          const city_data = ratio_scores.find(item => item.city_name === city)


          // get ratio score
          const ratio_score = city_data.ratio_score
          scores.push({score: ratio_score, name: city, category: 'ratioScore'})
          
          // calculate total score
          const {total_score, goodCats, badCats} = calculateTotalScore(scores, data)
          
          // convert obj list into single obj
          const scoreObj = {}
          scores.forEach(score => {
            scoreObj[score.category] = score.score
          })


          scoresList.push({...scoreObj, total_score, city_data, goodCats, badCats});
      }));
      const sorted25 = scoresList.sort((a, b) => b.total_score - a.total_score).slice(0, 5)
      return sorted25;
  } catch (err) {
      throw err;
  }
}

// run(demo).then(resp => {
//   console.log(resp[0])
//   process.exit()
// })

module.exports = { run };