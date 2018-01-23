'use strict'

const IncidentsDb = require('./lib/db')

module.exports = function setupDatabase (options) {
  return new IncidentsDb(options)
}
