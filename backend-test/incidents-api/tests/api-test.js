const test = require('ava')
const micro = require('micro')
const listen = require('test-listen')
const request = require('request-promise-native')
const fixtures = require('./fixtures')
const api = require('../api')

test.beforeEach(async t => {
  const server = micro(api)
  const url = await listen(server)
  t.context.url = url
})

test('POST /incidents', async t => {
  const incident = fixtures.getIncident()
  const url = t.context.url

  const options = {
    method: 'POST',
    uri: `${url}/incidents`,
    json: true,
    body: incident,
    resolveWithFullResponse: true
  }

  const response = await request(options)

  t.is(response.statusCode, 201)
  t.is(response.body._id, incident._id)
  t.is(response.body.kind, incident.kind)
  t.is(response.body.locationId, incident.locationId)
})

test('GET /incidents', async t => {
  const incidents = fixtures.getIncidents()
  const url = t.context.url

  const options = {
    method: 'GET',
    uri: `${url}/incidents`,
    json: true,
    resolveWithFullResponse: true
  }

  const response = await request(options)

  t.is(response.statusCode, 200)
  t.is(Array.isArray(response.body), Array.isArray(incidents))
  t.is(response.body.length, incidents.length)
})

test('POST /incidents/:incidentId/archive', async t => {
  const incident = fixtures.getIncident()
  const url = t.context.url

  const options = {
    method: 'POST',
    uri: `${url}/incidents/${incident._id}/archive`,
    json: true,
    resolveWithFullResponse: true
  }

  const response = await request(options)

  t.is(response.statusCode, 200)
  t.true(response.body.isArchived)
})

test('POST /localities', async t => {
  const locality = fixtures.getLocality()
  const url = t.context.url

  const options = {
    method: 'POST',
    uri: `${url}/localities`,
    json: true,
    body: locality,
    resolveWithFullResponse: true
  }

  const response = await request(options)

  t.is(response.statusCode, 201)
  t.is(response.body._id, locality._id)
  t.is(response.body.name, locality.name)
})

test('GET /localities', async t => {
  const localities = fixtures.getLocalities()
  const url = t.context.url

  const options = {
    method: 'GET',
    uri: `${url}/localities`,
    json: true,
    resolveWithFullResponse: true
  }

  const response = await request(options)

  t.is(response.statusCode, 200)
  t.is(Array.isArray(response.body), Array.isArray(localities))
  t.is(response.body.length, localities.length)
})

test('GET /localities/:localityId', async t => {
  const locality = fixtures.getLocality()
  const url = t.context.url

  const options = {
    method: 'GET',
    uri: `${url}/localities/${locality._id}`,
    json: true,
    resolveWithFullResponse: true
  }

  const response = await request(options)

  t.is(response.statusCode, 200)
  t.is(response.body._id, locality._id)
})