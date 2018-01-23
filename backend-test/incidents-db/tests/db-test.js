const test = require('ava')
const setupDatabase = require('../')
const fixtures = require('./fixtures')
const config = require('../../config')

const db = setupDatabase(config.db)

test.beforeEach(async t => {
  await db.setup()
})

test.afterEach(async t => {
  await db.drop()
})

test.serial('db#saveLocality', async t => {
  t.is(typeof db.saveLocality, 'function', 'Should be a function')

  const locality = fixtures.getLocality()

  let created = await db.saveLocality(locality)

  created = JSON.parse(JSON.stringify(created))

  t.is(created.name, locality.name)
})

test.serial('db#getLocality', async t => {
  t.is(typeof db.getLocality, 'function', 'Should be a function')

  const locality = fixtures.getLocality()
  let created = await db.saveLocality(locality)
  created = JSON.parse(JSON.stringify(created))
  t.is(created.name, locality.name)

  let found = await db.getLocality(created._id)
  found = JSON.parse(JSON.stringify(found))

  t.is(found._id, created._id)
  t.is(found.name, created.name)
})

test.serial('db#getLocalities', async t => {
  t.is(typeof db.getLocalities, 'function', 'Should be a function')

  const localities = fixtures.getLocalities()

  for (let locality of localities) {
    await db.saveLocality(locality)
  }

  const result = await db.getLocalities()

  t.is(localities.length, result.length)
})

test.serial('db#saveIncident', async t => {
  t.is(typeof db.saveIncident, 'function', 'Should be a function')

  let locality = fixtures.getLocality()
  locality = await db.saveLocality(locality)
  locality = JSON.parse(JSON.stringify(locality))

  let incident = fixtures.getIncident()
  incident.localityId = locality._id

  let created = await db.saveIncident(incident)
  created = JSON.parse(JSON.stringify(created))

  t.is(created.kind, incident.kind)
  t.is(created.localityId, incident.localityId)
})

test.serial('db#getIncident', async t => {
  t.is(typeof db.getIncident, 'function', 'Should be a function')

  let locality = fixtures.getLocality()
  locality = await db.saveLocality(locality)
  locality = JSON.parse(JSON.stringify(locality))

  let incident = fixtures.getIncident()
  incident.localityId = locality._id
  incident = await db.saveIncident(incident)
  incident = JSON.parse(JSON.stringify(incident))

  let found = await db.getIncident(incident._id)
  found = JSON.parse(JSON.stringify(found))

  t.is(found._id, incident._id)
  t.is(found.kind, incident.kind)
  t.is(found.localityId, incident.localityId)
})

test.serial('db#getIncidents', async t => {
  t.is(typeof db.getIncidents, 'function', 'Should be a function')

  let locality = fixtures.getLocality()
  locality = await db.saveLocality(locality)
  locality = JSON.parse(JSON.stringify(locality))

  const incidents = fixtures.getIncidents()

  for (let incident of incidents) {
    incident.localityId = locality._id
    await db.saveIncident(incident)
  }

  const result = await db.getIncidents()

  t.is(incidents.length, result.length)
})

test.serial('db#archiveIncident', async t => {
  t.is(typeof db.archiveIncident, 'function', 'Should be a function')

  let locality = fixtures.getLocality()
  locality = await db.saveLocality(locality)
  locality = JSON.parse(JSON.stringify(locality))

  let incident = fixtures.getIncident()
  incident.localityId = locality._id
  incident = await db.saveIncident(incident)
  incident = JSON.parse(JSON.stringify(incident))

  let updated = await db.archiveIncident(incident._id)

  t.is(updated.kind, incident.kind)
  t.is(updated.localityId, incident.localityId)
  t.true(updated.isArchived)
})
