const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    static associate({ User }) {
      this.hasMany(User, { foreignKey: 'id' });
    }
  }
  Team.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Team',
  });
  return Team;
};
