const fixtures = require('../fixtures')

class IncidentsDb {
  saveIncident (incident) {
    return Promise.resolve(incident)
  }

  getIncidents () {
    return Promise.resolve(fixtures.getIncidents())
  }

  archiveIncident (incidentId) {
    const incident = fixtures.getIncident()
    incident.isArchived = true
    return Promise.resolve(incident)
  }

  saveLocality(locality) {
    return Promise.resolve(locality)
  }

  getLocalities () {
    return Promise.resolve(fixtures.getLocalities())
  }

  getLocality (localityId) {
    const locality = fixtures.getLocality()
    locality._id = localityId
    return Promise.resolve(locality)
  }
}

module.exports = IncidentsDb