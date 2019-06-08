const knex = require('knex');

const configOptions = require('../knexfile');

// set environment based on production or development
let env = process.env.NODE_ENV || 'development';

// if the environment is in dev mode
//  then use development knex config for db

module.exports = knex(configOptions[env]);
