require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const salaries = require("./routes/salaries");
const findMyCity = require("./routes/findMyCity");
const jobs = require("./routes/jobs");
const scores = require("./routes/scores");
const info = require("./routes/info");

const PORT = process.env.PORT || 8080;
const CLIENT_URL = process.env.CLIENT_URL;

app.use(
    cors({
      origin: CLIENT_URL
    })
  );

app.use(express.json());

app.use("/salaries", salaries);
app.use("/findmycity", findMyCity);
app.use("/jobs", jobs);
app.use("/scores", scores);
app.use("/info", info);

app.get("/", (_req, res) => {
    res.send("Hello world");
  });

app.listen(PORT, () => {
console.log(`🚀 Server listening on ${PORT}`);
});