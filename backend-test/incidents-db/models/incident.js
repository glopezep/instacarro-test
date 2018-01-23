module.exports = (sequelize, DataTypes) => {
  return sequelize.define('incident', {
    _id: {
      type: DataTypes.CHAR(36),
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    kind: {
      type: DataTypes.ENUM,
      values: ['ROBBERY', 'MURDER', 'TRAFFIC_ACCIDENT', 'SHOOTING', 'ASSAULT']
    },
    happendAt: {
      type: DataTypes.DATE,
      defaultValue: new Date()
    },
    isArchived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    paranoid: true
  })
}
