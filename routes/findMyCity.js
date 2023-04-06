const express = require("express");
const knex = require("knex")(require("../knexfile"));
const router = express.Router();

router.route("/")
    .get((_req, res) => {
        res.send("findMyCity endpoint")
    })
    .post((req, res) => {
        console.log(req.body)
        res.json(req.body)
    })
module.exports = router;