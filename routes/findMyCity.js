const express = require("express");
const router = express.Router();
const getRecs = require('../scripts/getRecs');

router.route("/")
    .get((_req, res) => {
        res.send("findMyCity endpoint")
    })
    .post((req, res) => {
        getRecs.run(req.body)
            .then(recs => {
                res.status(200).json(recs)
            })
            .catch(function(err) {
                res.status(500).send(err.message);
              });
    })
module.exports = router;

// const express = require("express");
// const router = express.Router();

// const knexScores = require('../scripts/knexScores');

// router.route("/")

//     .get((_req, res) => {
//         knexScores.run()
//             .then(scores => {
//                 res.status(200).json(scores)
//             })
//             .catch(function(err) {
//                 res.status(500).send(err.message);
//               });
//     })