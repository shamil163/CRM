const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Department, Team }) {
      this.belongsTo(Department, { foreignKey: 'departmentid' });
      this.belongsTo(Team, { foreignKey: 'teamid' });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    picture: DataTypes.STRING,
    role: DataTypes.STRING,
    teamid: DataTypes.INTEGER,
    departmentid: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
