const db = require('../db/models');

const employeesRender = async (req, res) => {
  const employees = await db.User.findAll({ include: [db.Department, db.Team] });
  res.render('employees', { employees });
};

const updatedEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name, email, picture, role, teamid, departmentid,
    } = req.body;
    if (id) {
      const currentUser = await db.User.update(
        {
          name, email, picture, role, teamid, departmentid,
        },
        {
          where: { id },
          returning: true,
          plain: true,
        },
      );
      return res.json(currentUser).status(200);
    }
    return res.sendStatus(418);
  } catch (error) {
    return res.sendStatus(500);
  }
};

const editPageRender = async (req, res) => {
  const { id } = req.params;
  const currentUser = await db.User.findOne({
    where: { id },
  });
  const teams = await db.Team.findAll();
  const departments = await db.Department.findAll();
  res.render('editpage', { currentUser, teams, departments });
};

const findEmployeeByName = async (req, res) => {
  try {
    const { name } = req.body;
    if (name) {
      const currentEmployee = await db.User.findAll({
        where: { name }, include: [db.Department, db.Team],
      });
      return res.render('employees', { employees: currentEmployee });
    }
    return res.sendStatus(404);
  } catch (error) {
    return res.sendStatus(500);
  }
};

module.exports = {
  employeesRender,
  updatedEmployee,
  editPageRender,
  findEmployeeByName,
};
