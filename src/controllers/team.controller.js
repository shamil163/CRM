const db = require('../db/models');

const teamRender = async (req, res) => {
  const allTeam = await db.Team.findAll({ order: [['id', 'DESC']] });
  res.render('teams', { teams: allTeam });
};

const teamCreate = async (req, res) => {
  try {
    const {
      name, description,
    } = req.body;
    if (name && description) {
      const newTeam = await db.Team.create(
        {
          name, description,
        },
        { returning: true, plain: true },
      );
      return res.status(201).json(newTeam);
    }
    return res.sendStatus(406);
  } catch (error) {
    return res.sendStatus(500);
  }
};

const getEmployeesByTeam = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const employees = await db.User.findAll({
        where: { teamid: id }, include: [db.Department, db.Team],
      });
      return res.render('employees', { employees });
    }
    return res.sendStatus(404);
  } catch (error) {
    return res.sendStatus(500);
  }
};

const findTeamByName = async (req, res) => {
  try {
    const { name } = req.body;
    if (name) {
      const currenTeam = await db.Team.findAll({
        where: { name },
      });
      return res.render('teams', { teams: currenTeam });
    }
    return res.sendStatus(404);
  } catch (error) {
    return res.sendStatus(500);
  }
};

module.exports = {
  teamRender,
  teamCreate,
  getEmployeesByTeam,
  findTeamByName,
};
