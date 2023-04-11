const express = require("express");

const router = express.Router();

const getKnexData = require('../scripts/getKnexData');


router.route("/")

    .get((_req, res) => {
        res.send("salaries endpoint")
    })

    .post((req, res) => {
        const inputData = req.body;
        getKnexData.run(inputData)
          .then(function(salaries) {
            res.status(200).json(salaries);
          })
          .catch(function(err) {
            res.status(500).send(err.message);
          });
      });



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