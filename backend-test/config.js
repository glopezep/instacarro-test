module.exports = {
  db: {
    database: 'incidents',
    username: 'user',
    password: 'password',
    host: 'localhost',
    dialect: 'sqlite',
    pool: {
      max: 10,
      min: 0,
      idle: 10000
    }
  }
}