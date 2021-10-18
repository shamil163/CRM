const db = require('../db/models');

const checkAuthForAdmin = async (req, res, next) => {
  const userId = req.session?.user?.id;
  if (userId) {
    const currentUser = await db.User.findOne({ where: { id: userId } });
    if (currentUser.dataValues.role === 'admin') {
      res.locals.admin = currentUser.role;
    }
    if (currentUser.dataValues.role !== 'admin') {
      res.locals.user = currentUser.name;
    }
  }
  return next();
};

const authCheck = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  return res.sendStatus(401);
};

const checkAuthForNavbar = async (req, res, next) => {
  const userId = req.session?.user?.id;
  if (userId) {
    const currentUser = await db.User.findOne({ where: { id: userId } });
    if (currentUser) {
      res.locals.name = currentUser.name;
      res.locals.email = currentUser.email;
      res.locals.id = currentUser.id;
    }
  }
  return next();
};

module.exports = {
  checkAuthForAdmin,
  authCheck,
  checkAuthForNavbar,
};
