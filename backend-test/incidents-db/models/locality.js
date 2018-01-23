module.exports = (sequelize, DataTypes) => {
  return sequelize.define('locality', {
    _id: {
      type: DataTypes.CHAR(36),
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    paranoid: true
  })
}
