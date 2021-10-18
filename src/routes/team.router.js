const { Router } = require('express');
const {
  teamRender, teamCreate, getEmployeesByTeam, findTeamByName,
} = require('../controllers/team.controller');

const teamRouter = Router();

teamRouter.route('/')
  .get(teamRender)
  .post(teamCreate);

teamRouter.route('/:id')
  .get(getEmployeesByTeam);

teamRouter.route('/find')
  .post(findTeamByName);

module.exports = teamRouter;
