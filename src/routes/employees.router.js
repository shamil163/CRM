const { Router } = require('express');
const {
  employeesRender, updatedEmployee, editPageRender, findEmployeeByName,
} = require('../controllers/employees.controller');
// const { authCheck } = require('../middlewares/checkAuth');

const employeesRouter = Router();

employeesRouter.route('/')
  .get(employeesRender)
  .post(findEmployeeByName);

employeesRouter.route('/edit/:id')
  .get(editPageRender)
  .put(updatedEmployee);

module.exports = employeesRouter;
