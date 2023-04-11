const fs = require('fs')

const scoresData = JSON.parse(fs.readFileSync('./data/newDetails/allScores.json'))

const summary_seed = []
let counter = 1
scoresData.forEach(score => {

    const id = counter;
    const summary = score.summary || null;
    const total_score = score.teleport_city_score || null;
    const city_id = counter

    newObj = {
        id, summary, total_score, city_id
    }
    summary_seed.push(newObj)
    counter ++;
})

fs.writeFileSync('./data/seed_data/summary_seeds.json', JSON.stringify(summary_seed))
