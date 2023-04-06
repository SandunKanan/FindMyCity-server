const express = require("express");
const knex = require("knex")(require("../knexfile"));
const router = express.Router();

router.route("/")

    .get((_req, res) => {
        res.send("salaries endpoint")
    })

    .post((req, res) => {
        const {role, exp} = req.body
        knex("salaries").select("salaries.amount", {percentile: "percentiles.name"}, {city_name: "cities.name"}, "jobs.title")
        // , "jobs.title", "percentiles.name", "cities.name"
            .join("cities", {"salaries.city_id":"cities.city_id"})
            .join("jobs", {"salaries.job_id":"jobs.job_id"})
            .join("percentiles", {"salaries.percentile_id":"percentiles.percentile_id"})
            // join('tab2',{'tab1.id':'tab2.id'
            // .join("percentiles")
            // .join("cities")
            .where({"jobs.title": role})
            .andWhere({"percentiles.name": exp})
            .whereIn("cities.name", ["Barcelona", "Zurich", "Sydney"])
            .limit(5)
        .then((salaries) => {
        res.status(200).json(salaries);
    })})


    // .join("warehouses")
    // .where({ "warehouses.id": warehouse_id })
    // .insert({ id: uuid(), ...req.body })
    // .then((newInventory) => {
    //   res.status(201).json(newInventory);
    // })

router.route("/:job")
    .get((_req, res) => {
        res.send("salaries endpoint")
    })

module.exports = router;

// router.route("/").get((req, res) => {
//     knex("inventories")
//       .then((inventories) => {
//         res.status(201).json(inventories);
//         console.log(inventories);
//       })
//       .catch((err) => {
//         res
//           .status(400)
//           .json({ message: `Error retrieving inventories Error:${err}` });
//       });
//   });