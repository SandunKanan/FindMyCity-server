const fs = require('fs')

const city_list = JSON.parse(fs.readFileSync('./data/urban_area_list.json'))

const language_seed = []

let counter = 1
city_list.forEach(city => {
    const nextCity = city.toLowerCase().replaceAll(",", "").replaceAll(" ", "-").replaceAll(".", "")
    const details = JSON.parse(fs.readFileSync(`./data/cityDetails/${nextCity}_details.json`))
    if (Object.keys(details[details.length-1])[0]==='salaries') {
        details.pop()
    }
    const found = details.find(detail => {
        return detail.label === "Language"
    })?.data
     if (!found) {
        language_seed.push({
            id: counter,
            ENGLISH_SKILLS_DETAIL: null,
            ENGLISH_SKILLS_TELESCORE: null,
            SPOKEN_LANGUAGES: null,
            city_id: counter
        })
        counter ++;
        return
    }
    if (counter===2) {
        console.log(found.find(item => item.id==='ENGLISH-SKILLS-DETAIL')?.int_value)
    }

    const ENGLISH_SKILLS_DETAIL = found.find(item => item.id==='ENGLISH-SKILLS-DETAIL')?.int_value || null
    const ENGLISH_SKILLS_TELESCORE = found.find(item => item.id==='ENGLISH-SKILLS-TELESCORE')?.float_value || null
    const SPOKEN_LANGUAGES = found.find(item => item.id==='SPOKEN-LANGUAGES')?.string_value || null
    
    language_seed.push({
        id: counter,
        ENGLISH_SKILLS_DETAIL,
        ENGLISH_SKILLS_TELESCORE,
        SPOKEN_LANGUAGES,
        city_id: counter
    })
    counter ++;
    }
    
);

fs.writeFileSync('./data/seed_data/language_seeds.json', JSON.stringify(language_seed))


// .createTable('language', table => {
//     table.increments('id').primary();
//     table.integer("ENGLISH_SKILLS_DETAIL");
//     table.decimal("ENGLISH_SKILLS_TELESCORE");
//     table.string("SPOKEN_LANGUAGES")
//     table.integer('city_id')

// {
//     "id": "ENGLISH-SKILLS-DETAIL",
//     "int_value": 56.66,
//     "label": "English skills",
//     "type": "int"
//   },
//   {
//     "float_value": 0.5666,
//     "id": "ENGLISH-SKILLS-TELESCORE",
//     "label": "English skills [Teleport score]",
//     "type": "float"
//   },
//   {
//     "id": "SPOKEN-LANGUAGES",
//     "label": "Spoken languages",
//     "string_value": "Spanish, Catalan",
//     "type": "string"
//   }