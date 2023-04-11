const express = require("express");
const router = express.Router();
const getInfo = require('../scripts/getInfo');

router.route("/:city")
    .get((req, res) => {
        getInfo.run(req.params.city)
            .then(info => {
                res.status(200).json(info)
            })
            .catch(function(err) {
                res.status(500).send(err.message);
              });
    })
module.exports = router;
