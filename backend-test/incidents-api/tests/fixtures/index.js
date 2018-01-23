const casual = require('casual')

exports.getLocality = function getLocality () {
  return { 
    _id: casual.uuid, 
    name: casual.name 
  }
}

exports.getLocalities = function getLocalities () {
  return [1, 2, 3].map(_ => exports.getLocality())
}

exports.getIncident = function getIncident () {
  return { 
    _id: casual.uuid, 
    kind: casual.name, 
    locationId: casual.uuid, 
    happenedAt: new Date()
  }
}

exports.getIncidents = function getIncidents () {
  return [1, 2, 3].map(_ => exports.getIncident())
}
