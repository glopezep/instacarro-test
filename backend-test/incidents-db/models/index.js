const sequelizeImport = require('sequelize-import')

module.exports = function getModels (sequelize) {
  const options = {
    exclude: ['index.js']
  }

  const models = sequelizeImport(__dirname, sequelize, options)

  models.incident.belongsTo(models.locality)
  models.locality.hasMany(models.incident)

  return models
}
