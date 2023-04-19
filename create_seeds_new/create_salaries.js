const fs = require('fs')

const city_table = JSON.parse(fs.readFileSync('./data/seed_data/city_seeds.json'))
const jobs_table = JSON.parse(fs.readFileSync('./data/seed_data/job_seeds.json'))
const perc_table = JSON.parse(fs.readFileSync('./data/seed_data/percentile_seeds.json'))

let salary_id = 1
salary_seeds = []
city_table.forEach(city_data => {
    const city = city_data.name.toLowerCase().replaceAll(",", "").replaceAll(" ", "-").replaceAll(".", "")
    const city_id = city_data.city_id

    const details = JSON.parse(fs.readFileSync(`./data/cityDetails/${city}_details.json`))
    const salary_section = details.find(item => !!item.salaries).salaries

    salary_section.forEach(job_data => {
        const matching_item = jobs_table.find(job_item => {
            // return the 
            return job_data.job.title === job_item.title
        })
        const job_id = matching_item.job_id

        percs = Object.keys(job_data.salary_percentiles)
        percs.forEach(perc => {
            const matching_perc = perc_table.find(perc_item => {
                    return perc === perc_item.name
                })
            const percentile_id = matching_perc.percentile_id
            const amount = job_data.salary_percentiles[perc]
            const salary_item = {
                salary_id,
                city_id,
                job_id,
                percentile_id,
                amount
            }
            salary_seeds.push(salary_item)
            salary_id ++;
        })
    })

})

fs.writeFileSync('./data/seed_data/salary_seeds.json', JSON.stringify(salary_seeds))

