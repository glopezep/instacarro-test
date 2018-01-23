const casual = require('casual')

exports.getLocality = function getLocality () {
  return { name: casual.name }
}

exports.getLocalities = function getLocalities () {
  return [1, 2, 3].map(_ => exports.getLocality())
}

exports.getIncident = function getIncident () {
  return { kind: casual.name }
}

exports.getIncidents = function getIncidents () {
  return [1, 2, 3].map(_ => exports.getIncident())
}
