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
    const limit = parseInt(req.query.limit)
    const page = parseInt(req.query.page)

    let incidents = await db.getIncidents({
      offset: page === 1 ? 0 : page * limit,
      limit: limit,
      orderBy: req.query.orderBy,
      orderMethod: req.query.orderMethod
    })
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

async function saveLocality (req, res) {
  try {
    let locality = await json(req)
    locality = await db.saveLocality(locality)
    send(res, 201, locality)
  } catch (e) {
    if (e.message.match(/not found/)) {
      return send(res, 404, { err: e.message })
    }
    send(res, 500, { err: e.message })
  }
}

async function getLocalities (req, res) {
  try {
    const limit = parseInt(req.query.limit)
    const page = parseInt(req.query.page)

    let localities = await db.getLocalities({
      offset: page === 1 ? 0 : page * limit,
      limit: limit,
      orderBy: req.query.orderBy,
      orderMethod: req.query.orderMethod
    })

    send(res, 200, localities)
  } catch (e) {
    if (e.message.match(/not found/)) {
      return send(res, 404, { err: e.message })
    }
    send(res, 500, { err: e.message })
  }
}

async function getLocality (req, res) {
  try {
    let locality = await db.getLocality(req.params.localityId)
    send(res, 200, locality)
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
  post('/localities', saveLocality),
  get('/localities', getLocalities),
  get('/localities/:localityId', getLocality)
)
