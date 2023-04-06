const fs = require('fs')

const city_list = JSON.parse(fs.readFileSync('./data/urban_area_list.json'))

const job_list = []

city_list.forEach(city => {
    const nextCity = city.toLowerCase().replaceAll(",", "").replaceAll(" ", "-").replaceAll(".", "")
    const details = JSON.parse(fs.readFileSync(`./data/cityDetails/${nextCity}_details.json`))
    const salary_section = details.find(item => !!item.salaries).salaries
    salary_section.forEach(jobObj => {
        if (!job_list.find(item => {
            return jobObj.job.title == item;
        })) {
            job_list.push(jobObj.job.title)
        }
    })
});

const job_seeds = job_list.map((job) => {
    return {
        job_id: job_list.indexOf(job) + 1,
        title: job
    }
})


fs.writeFileSync('./data/seed_data/job_seeds.json', JSON.stringify(job_seeds))

