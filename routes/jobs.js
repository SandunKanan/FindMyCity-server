const express = require("express");
const knex = require("knex")(require("../knexfile"));
const router = express.Router();

router.route("/").get((_req, res) => {
    knex("jobs").select("title")
    .then((jobs) => {
        jobs_list = jobs.map(job => job.title)
        res.status(201).json(jobs_list);
    })
    .catch((err) => {
      res
        .status(400)
        .json({message: `Error retrieving inventories Error:${err}`});
    });
})


module.exports = router;