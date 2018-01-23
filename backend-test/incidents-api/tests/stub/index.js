const fixtures = require('../fixtures')

class IncidentsDb {
  saveIncident (incident) {
    return Promise.resolve(incident)
  }

  getIncidents () {
    return Promise.resolve([])
  }

  getIncidents(incidentId) {
    return Promise.resolve({})
  }
}

module.exports = IncidentsDb