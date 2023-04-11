const knex = require("knex")(require("../knexfile"));

async function run() {
    try {
      const scores = await knex("summaries")
        .select("summaries.summary", "summaries.total_score", { city_name: "cities.name" })
        .join("cities", { "summaries.city_id": "cities.city_id" })
        .whereIn("cities.name", ["Barcelona", "Zurich", "Sydney"])
        .limit(5)
      const outputData = { scores };
      return outputData;
    } 
    
    catch (err) {
      throw err;
    }
  }
  
  module.exports = { run };