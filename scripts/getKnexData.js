const knex = require("knex")(require("../knexfile"));

async function run(input) {
  try {
    console.log(input)
    const { role, exp } = input;
    const salaries = await knex("salaries")
      .select("salaries.amount", { percentile: "percentiles.name" }, { city_name: "cities.name" }, "jobs.title")
      .join("cities", { "salaries.city_id": "cities.city_id" })
      .join("jobs", { "salaries.job_id": "jobs.job_id" })
      .join("percentiles", { "salaries.percentile_id": "percentiles.percentile_id" })
      .where({ "jobs.title": role })
      .andWhere({ "percentiles.name": exp })
      .limit(5);
    const outputData = { salaries };

    const costOfLiving = await knex("cost_of_living")
      .select("*")
      .join("cities", { "cost_of_living.city_id": "cities.city_id" })
      

    return outputData;
  } catch (err) {
    throw err;
  }
}

module.exports = { run };