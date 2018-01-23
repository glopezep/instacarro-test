'use strict'

const Sequelize = require('sequelize')
const Promise = require('bluebird')
const getModels = require('../models')
const config = require('../../config')

class IncidentsDb {
  constructor (options) {
    this.options = options || config.db
    this.sequelize = new Sequelize(this.options)
    this.models = getModels(this.sequelize)
  }

  async saveLocality (locality, callback) {
    try {
      return Promise.resolve(this.models.locality.create(locality)).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async getLocality (localityId, callback) {
    try {
      return Promise.resolve(this.models.locality.findOne({
        where: { _id: localityId },
        include: [ { all: true, nested: true } ]
      })).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async getLocalities (callback) {
    try {
      return Promise.resolve(this.models.locality.findAll({
        include: [{ all: true, nested: true }]
      })).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async saveIncident (incident, callback) {
    try {
      return Promise.resolve(this.models.incident.create(incident)).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async getIncident (incidentId, callback) {
    try {
      return Promise.resolve(this.models.incident.findOne({
        where: { _id: incidentId, isArchived: false },
        include: [{ all: true, nested: true }]
      })).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async getIncidents (callback) {
    try {
      return Promise.resolve(this.models.incident.findAll({
        where: { isArchived: false },
        include: [{ all: true, nested: true }]
      })).asCallback(callback)
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async archiveIncident (incidentId, callback) {
    try {
      const incident = await this.getIncident(incidentId)
      return Promise.resolve(incident.update({ isArchived: true }))
    } catch (e) {
      return Promise.reject(e).asCallback(callback)
    }
  }

  async setup (callback) {
    return Promise.resolve(this.sequelize.sync()).asCallback(callback)
  }

  async drop (callback) {
    return Promise.resolve(this.sequelize.drop()).asCallback(callback)
  }
}

module.exports = IncidentsDb
