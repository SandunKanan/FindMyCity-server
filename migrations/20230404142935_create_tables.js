exports.up = function(knex) {
    return knex.schema
        .createTable('cities', (table) => {
            table.increments('city_id').primary();
            table.string('name').notNullable();
        })
        .createTable('jobs', (table) => {
            table.increments('job_id').primary();
            table.string('title').notNullable();
        })
        .createTable('percentiles', (table) => {
            table.increments('percentile_id').primary();
            table.string('name').notNullable();
        })
        .createTable('salaries', (table) => {
            table.increments('salary_id').primary();
            table
                .integer('city_id')
                .unsigned()
                .notNullable()
                .references('city_id')
                .inTable('cities')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            table
                .integer('job_id')
                .unsigned()
                .notNullable()
                .references('job_id')
                .inTable('jobs')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            table
                .integer('percentile_id')
                .unsigned()
                .notNullable()
                .references('percentile_id')
                .inTable('percentiles')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            table.decimal('amount').notNullable();
        })
        .createTable('city_size', (table) => {
            table.increments('id').primary();
            table.decimal('POPULATION_SIZE',10,5);
            table.decimal('POPULATION_UA_CENTER_DENSITY',15,5);
            table.decimal('POPULATION_UA_DENSITY',15,5);
            table.integer('city_id')
                .unsigned()
                .notNullable()
                .references('city_id')
                .inTable('cities')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
        })
        .createTable('climate', (table) => {
            table.increments('id').primary();
            table.decimal('WEATHER_AV_DAY_LENGTH',10,5);
            table.string('WEATHER_AVERAGE_HIGH');
            table.string('WEATHER_AVERAGE_LOW');
            table.decimal('WEATHER_SUNSHINE_AMOUNT');
            table.decimal("WEATHER_TYPE");
            table.integer('city_id')
                .unsigned()
                .notNullable()
                .references('city_id')
                .inTable('cities')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
        })
        .createTable('cost_of_living', (table) => {
            table.increments('id').primary();
            table.decimal("COST_APPLES")
            table.decimal("COST_BREAD")
            table.decimal("COST_CAPPUCCINO")
            table.decimal("COST_CINEMA")
            table.decimal("COST_FITNESS_CLUB")
            table.decimal("COST_IMPORT_BEER")
            table.decimal("COST_PUBLIC_TRANSPORT")
            table.decimal("COST_TAXI")
            table.decimal("RESTAURANT_PRICE_INDEX")
            table.integer('city_id')
                .unsigned()
                .notNullable()
                .references('city_id')
                .inTable('cities')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
        })
        .createTable('healthcare', (table) => {
            table.increments('id').primary();
            table.decimal("HEALTHCARE_COST_TELESCORE");
            table.decimal("HEALTHCARE_LIFE_EXPECTANCY");
            table.decimal("HEALTHCARE_LIFE_EXPECTANCY_TELESCORE");
            table.decimal("HEALTHCARE_QUALITY_TELESCORE");
            table.integer('city_id')
                .unsigned()
                .notNullable()
                .references('city_id')
                .inTable('cities')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
        })
        .createTable('housing', table => {
            table.increments('id').primary();
            table.decimal("APARTMENT_RENT_LARGE");
            table.decimal("APARTMENT_RENT_MEDIUM");
            table.decimal("APARTMENT_RENT_SMALL");
            table.decimal("RENT_INDEX_TELESCORE");
            table.integer('city_id')
                .unsigned()
                .notNullable()
                .references('city_id')
                .inTable('cities')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
        })
        .createTable('language', table => {
            table.increments('id').primary();
            table.integer("ENGLISH_SKILLS_DETAIL");
            table.decimal("ENGLISH_SKILLS_TELESCORE");
            table.string("SPOKEN_LANGUAGES")
            table.integer('city_id')
                .unsigned()
                .notNullable()
                .references('city_id')
                .inTable('cities')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
        })
        .createTable('environmental_quality', table => {
            table.increments('id').primary();
            table.decimal("AIR_POLLUTION_TELESCORE")
            table.decimal("CLEANLINESS_TELESCORE")
            table.decimal("DRINKING_WATER_QUALITY_TELESCORE")
            table.decimal("URBAN_GREENERY_TELESCORE")
            table.integer('city_id')
                .unsigned()
                .notNullable()
                .references('city_id')
                .inTable('cities')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
        })
        .createTable('safety', table => {
            table.increments('id').primary();
            table.decimal("CRIME_RATE_TELESCORE")
            table.integer("GUN_DEATH_RATE")
            table.decimal("GUN_DEATH_SCORE_TELESCORE")
            table.integer("GUN_OWNERSHIP")
            table.decimal("GUN_OWNERSHIP_SCORE_TELESCORE")
            table.decimal("GUN_SCORE_TELESCORE")
            table.integer('city_id')
                .unsigned()
                .notNullable()
                .references('city_id')
                .inTable('cities')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
        })
        .createTable('commute', table => {
            table.increments('id').primary();
            table.string("HUMAN_CITIES_PAGE_URLS")
            table.decimal("TRAFFIC_INDEX_TELESCORE")
            table.integer('city_id')
                .unsigned()
                .notNullable()
                .references('city_id')
                .inTable('cities')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
        })
        .createTable('travel_connectivity', table => {
            table.increments('id').primary();
            table.integer("AIRPORT_HUB_INDEX_DETAIL")
            table.decimal("AIRPORT_HUB_TELESCORE")
            table.decimal("TRAIN_TRANSPORT_TELESCORE")
            table.integer('city_id')
                .unsigned()
                .notNullable()
                .references('city_id')
                .inTable('cities')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
        })
}

exports.down = (knex) => {
    return knex.schema
        .dropTable('travel_connectivity')
        .dropTable('commute')
        .dropTable('safety')
        .dropTable('environmental_quality')
        .dropTable('language')
        .dropTable('housing')
        .dropTable('healthcare')
        .dropTable('cost_of_living')
        .dropTable('climate')
        .dropTable('city_size')
        .dropTable('salaries')
        .dropTable('percentiles')
        .dropTable('jobs')
        .dropTable('cities')
}