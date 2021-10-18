const { Router } = require('express');
const {
  departmentsRender, departmentsCreate, getEmployeesByDepartment, findDepByName,
} = require('../controllers/department.controller');

const departmentRouter = Router();

departmentRouter.route('/')
  .get(departmentsRender)
  .post(departmentsCreate);

departmentRouter.route('/find')
  .post(findDepByName);

departmentRouter.route('/:id')
  .get(getEmployeesByDepartment);

module.exports = departmentRouter;
