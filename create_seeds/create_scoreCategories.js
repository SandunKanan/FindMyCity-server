const fs = require('fs')

// const city_list = JSON.parse(fs.readFileSync('./data/urban_area_list.json'))

const scores = JSON.parse(fs.readFileSync('./data/newDetails/allScores.json'))

console.log(scores[5].categories[0])

const categories = []
scores.forEach(score => {
    score.categories.forEach(cat => {
        if (!categories.find(cat2 => (cat2 === cat.name))) {
            categories.push(cat.name)
        }
    })
})

// console.log(categories)

const cat_seeds = categories.map((cat) => {
    return {
        id: categories.indexOf(cat) + 1,
        category: cat
    }
})

// console.log(cat_seeds)

fs.writeFileSync('./data/seed_data/category_seeds.json', JSON.stringify(cat_seeds))

// {
//      id: 1
//      category: "Housing"
// }


// {
//     "score_id": 1,
//     "city_id": 1,
//     "category_id": 1,
//     "score": 8.43
//   }

// city_list.forEach(city => {
//     const nextCity = city.toLowerCase().replaceAll(",", "").replaceAll(" ", "-").replaceAll(".", "").replaceAll("galway", "gaillimh")
//     const scores = JSON.parse(fs.readFileSync(`./data/cityDetails/${nextCity}_details.json`))
//     const salary_section = details.find(item => !!item.salaries).salaries
//     salary_section.forEach(jobObj => {
//         if (!job_list.find(item => {
//             return jobObj.job.title == item;
//         })) {
//             job_list.push(jobObj.job.title)
//         }
//     })
// });

// const job_seeds = job_list.map((job) => {
//     return {
//         job_id: job_list.indexOf(job) + 1,
//         title: job
//     }
// })



