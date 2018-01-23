# incidents-db

## Usage

```js
const setupDatabase = require('incidents-db')

const options = {
  database: 'databaseName',
  username: 'dbUsername',
  password: 'dbPassword',
  host: '127.0.0.1',
  dialect: 'sqlite',
  pool: {
    max: 10,
    min: 0,
    idle: 10000
  }
}

const db = setupDatabase(options)

db.saveIncident({
  kind: 'ROBBERY',
  locationId: '03e9d7cd-3516-44c1-9771-4dbba415a6f9',
})
```

## API

### db#saveIncident(incident: Object, [callback]) -> Incident
Create an incident

### db#getIncident(incidentId: Number, [callback]) -> Incident
Retrieve an incident by id

### db#getIncidents([callback]) -> [Incident]
Retrieve an list of incidents

### db#archiveIncident(incidentId: Number, [callback]) -> Incident
Archive an incident

### db#saveLocality(locality: Object, [callback]) -> Locality
Create a locality

### db#getLocality(localityId: Number, [callback]) -> Locality
Retrieve a locality by id

### db#getLocalities([callback]) -> [Locality]
Retrieve an list of localities


## License
MIT © [Guillermo Lopez](http://www.guillermolopez.net)