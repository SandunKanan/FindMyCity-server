const fs = require('fs')

// const city_list = JSON.parse(fs.readFileSync('./data/urban_area_list.json'))

const scores = JSON.parse(fs.readFileSync('./data/newDetails/allScores.json'))
const categories = JSON.parse(fs.readFileSync('./data/seed_data/category_seeds.json'))

console.log(scores.length)

const scores_seeds = []
let counter = 1
let city_counter = 1
scores.forEach(score => {
    score.categories.forEach(cat => {
        const matching_cat = categories.find(c => c.category === cat.name)
        if (city_counter ===2) {
            console.log(matching_cat)
            console.log(cat.name)
        }
        if (matching_cat) {
            const id = counter;
            const city_id = city_counter;
            const category_id = matching_cat.id
            const score = cat.score_out_of_10
            newItem = {
                id,
                city_id,
                category_id,
                score
            }
            counter ++;
            scores_seeds.push(newItem)
        }
    })
    city_counter ++;
})

// {
//     "score_id": 1,
//     "city_id": 1,
//     "category_id": 1,
//     "score": 8.43
//   }

// console.log(cat_seeds)

fs.writeFileSync('./data/seed_data/scores_seeds.json', JSON.stringify(scores_seeds))

// const fs = require('fs')

// const city_table = JSON.parse(fs.readFileSync('./data/seed_data/city_seeds.json'))
// const jobs_table = JSON.parse(fs.readFileSync('./data/seed_data/job_seeds.json'))
// const perc_table = JSON.parse(fs.readFileSync('./data/seed_data/percentile_seeds.json'))

// let salary_id = 1
// salary_seeds = []
// city_table.forEach(city_data => {
//     const city = city_data.name.toLowerCase().replaceAll(",", "").replaceAll(" ", "-").replaceAll(".", "")
//     const city_id = city_data.city_id

//     const details = JSON.parse(fs.readFileSync(`./data/cityDetails/${city}_details.json`))
//     const salary_section = details.find(item => !!item.salaries).salaries

//     salary_section.forEach(job_data => {
//         const matching_item = jobs_table.find(job_item => {
//             // return the 
//             return job_data.job.title === job_item.title
//         })
//         const job_id = matching_item.job_id

//         percs = Object.keys(job_data.salary_percentiles)
//         percs.forEach(perc => {
//             const matching_perc = perc_table.find(perc_item => {
//                     return perc === perc_item.name
//                 })
//             const percentile_id = matching_perc.percentile_id
//             const amount = job_data.salary_percentiles[perc]
//             const salary_item = {
//                 salary_id,
//                 city_id,
//                 job_id,
//                 percentile_id,
//                 amount
//             }
//             salary_seeds.push(salary_item)
//             salary_id ++;
//         })
//     })

// })

// fs.writeFileSync('./data/seed_data/salary_seeds.json', JSON.stringify(salary_seeds))

