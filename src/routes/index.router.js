const { Router } = require('express');
const { indexRender, userHomeRender } = require('../controllers/index.controller');
// const { authCheck } = require('../middlewares/checkAuth');

const indexRouter = Router();

indexRouter.route('/')
  .get(indexRender);

indexRouter.route('/userhome')
  .get(userHomeRender);

indexRouter.route('/employees/:id')
  .get(userHomeRender);

module.exports = indexRouter;
