const knex = require("knex")(require("./knexfile"));

function run(input) {
    const { role, exp } = input;
    return knex("salaries")
      .select("salaries.amount", { percentile: "percentiles.name" }, { city_name: "cities.name" }, "jobs.title")
      .join("cities", { "salaries.city_id": "cities.city_id" })
      .join("jobs", { "salaries.job_id": "jobs.job_id" })
      .join("percentiles", { "salaries.percentile_id": "percentiles.percentile_id" })
      .where({ "jobs.title": role })
      .andWhere({ "percentiles.name": exp })
      .whereIn("cities.name", ["Barcelona", "Zurich", "Sydney"])
      .limit(5)
      .then((salaries) => {
        const outputData = { salaries };
        return outputData;
      })
      .catch((err) => {
        throw err;
      });
  }

module.exports = { run };