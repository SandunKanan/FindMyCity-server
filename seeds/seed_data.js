const cityData = require('../seed_data/cities');
const citySizeData = require('../seed_data/citySize');
const jobData = require('../seed_data/jobs');
const percData = require('../seed_data/percentiles');
const salaryData = require('../seed_data/salaries');
const climateData = require('../seed_data/climate');
const costOfLivingData = require('../seed_data/costOfLiving');
const healthcareData = require('../seed_data/healthcare');
const languageData = require('../seed_data/language');
const enviroQualityData = require('../seed_data/enviroQuality');
const safetyData = require('../seed_data/safety');
const commuteData = require('../seed_data/commute');
const travelConnectivityData = require('../seed_data/travelConnectivity');

exports.seed = function (knex) {
  return knex('cities').del()
    .then(() => {return knex('cities').insert(cityData);})
    .then(() => {return knex('jobs').del()})
    .then(() => {return knex('jobs').insert(jobData);})
    .then(() => {return knex('percentiles').del()})
    .then(() => {return knex('percentiles').insert(percData);})
    .then(() => {return knex('salaries').del()})
    .then(() => {return knex('salaries').insert(salaryData);})
    .then(() => {return knex('city_size').del()})
    .then(() => {return knex('city_size').insert(citySizeData);})
    .then(() => {return knex('climate').del()})
    .then(() => {return knex('climate').insert(climateData);})
    .then(() => {return knex('cost_of_living').del()})
    .then(() => {return knex('cost_of_living').insert(costOfLivingData);})
    .then(() => {return knex('healthcare').del()})
    .then(() => {return knex('healthcare').insert(healthcareData);})
    .then(() => {return knex('language').del()})
    .then(() => {return knex('language').insert(languageData);})
    .then(() => {return knex('environmental_quality').del()})
    .then(() => {return knex('safety').del();})
    .then(() => {return knex('safety').insert(safetyData);})
    .then(() => {return knex('commute').del()})
    .then(() => {return knex('commute').insert(commuteData);})
    .then(() => {return knex('travel_connectivity').del()})
    .then(() => {return knex('travel_connectivity').insert(travelConnectivityData);})
};

// // import seed data files, arrays of objects
// const inventoryData = require('../seed_data/inventory');
// const warehouseData = require('../seed_data/warehouse');

// exports.seed = function (knex) {
//   return knex('warehouse')
//     .del()
//     .then(function () {
//       return knex('warehouse').insert(warehouseData);
//     })
//     .then(() => {
//       return knex('inventory').del();
//     })
//     .then(() => {
//       return knex('inventory').insert(inventoryData);
//     });
// };