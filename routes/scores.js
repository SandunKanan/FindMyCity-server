const express = require("express");
const router = express.Router();

const knexScores = require('../scripts/knexScores');

router.route("/")

    .get((_req, res) => {
        knexScores.run()
            .then(scores => {
                res.status(200).json(scores)
            })
            .catch(function(err) {
                res.status(500).send(err.message);
              });
    })

    // .post((req, res) => {
    //     const inputData = req.body;
    //     getKnexData.run(inputData)
    //       .then(function(salaries) {
    //         res.status(200).json(salaries);
    //       })
    //       .catch(function(err) {
    //         res.status(500).send(err.message);
    //       });
    //   });



router.route("/:job")
    .get((_req, res) => {
        res.send("salaries endpoint")
    })

module.exports = router;
