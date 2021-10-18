const db = require('../db/models');

const indexRender = async (req, res) => {
  res.render('index');
};

const userHomeRender = (req, res) => {
  res.render('userhome');
};

module.exports = {
  indexRender,
  userHomeRender,
};
