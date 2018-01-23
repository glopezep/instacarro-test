const setupDatabase = require('./')
const config = require('../config')

const db = setupDatabase(config.db)

db.setup().then(_ => {
  console.log('Setup completed')
  process.exit(0)
}).catch(e => {
  console.error(e.stack)
  console.error(e.message)
  process.exit(1)
})