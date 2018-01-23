const { json, send } = require('micro')
const { post, get, router } = require('microrouter')
const setupDatabase = require('incidents-db')
const IncidentsDbStub = require('./tests/stub')
const config = require('../config')

let db = setupDatabase(config.db)

if (process.env.NODE_ENV === 'test') {
  db = new IncidentsDbStub()
}

async function saveIncident (req, res) {
  try {
    let incident = await json(req)
    incident = await db.saveIncident(incident)
    send(res, 201, incident) 
  } catch (e) {
    if (e.message.match(/not found/)) {
      return send(res, 404, { err: e.message })
    }
    send(res, 500, { err: e.message })    
  }
}

async function getIncidents (req, res) {
  try {
    let incidents = await db.getIncidents()
    send(res, 200, incidents)
  } catch (e) {
    if (e.message.match(/not found/)) {
      return send(res, 404, { err: e.message })
    }
    send(res, 500, { err: e.message })
  }
}

async function getIncidents(req, res) {
  try {
    let incidents = await db.getIncidents()
    send(res, 200, incidents)
  } catch (e) {
    if (e.message.match(/not found/)) {
      return send(res, 404, { err: e.message })
    }
    send(res, 500, { err: e.message })
  }
}

async function archiveIncident (req, res) {
  try {
    const id = req.params.incidentId
    let incidents = await db.archiveIncident(id)
    send(res, 200, incidents)
  } catch (e) {
    if (e.message.match(/not found/)) {
      return send(res, 404, { err: e.message })
    }
    send(res, 500, { err: e.message })
  }
}

module.exports = router(
  post('/incidents', saveIncident),
  get('/incidents', getIncidents),
  post('/incidents/:incidentId/archive', archiveIncident),  
  // get('/localities', getLocalities),  
  // get('/localities/:locationId', getLocality)  
)