const db = require('../db/models');

const departmentsRender = async (req, res) => {
  const allDepartment = await db.Department.findAll({ order: [['id', 'DESC']] });
  res.render('departments', { departments: allDepartment });
};

const departmentsCreate = async (req, res) => {
  try {
    const {
      name, description,
    } = req.body;
    if (name && description) {
      const newDepartment = await db.Department.create(
        {
          name, description,
        },
        { returning: true, plain: true },
      );
      return res.status(201).json(newDepartment);
    }
    return res.sendStatus(406);
  } catch (error) {
    return res.sendStatus(500);
  }
};

const getEmployeesByDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const employees = await db.User.findAll({ where: { departmentid: id }, include: [db.Department, db.Team] });
      return res.render('employees', { employees });
    }
    return res.sendStatus(404);
  } catch (error) {
    return res.sendStatus(500);
  }
};

const findDepByName = async (req, res) => {
  try {
    const { name } = req.body;
    if (name) {
      const currentDep = await db.Department.findAll({
        where: { name },
      });
      return res.render('departments', { departments: currentDep });
    }
    return res.sendStatus(404);
  } catch (error) {
    return res.sendStatus(500);
  }
};

module.exports = {
  departmentsRender,
  departmentsCreate,
  getEmployeesByDepartment,
  findDepByName,
};
