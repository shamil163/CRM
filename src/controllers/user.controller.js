require('dotenv').config();
const bcrypt = require('bcrypt');
const db = require('../db/models');

const saltRounds = 10;

const userSignupRender = async (req, res) => {
  const teams = await db.Team.findAll();
  const departments = await db.Department.findAll();
  if (req.query.err) {
    res.locals.err = 'Не все поля заполнены';
  }
  res.render('signup', { departments, teams });
};

const userSigninRender = (req, res) => {
  if (req.query.err) {
    res.locals.err = 'Не найден логин или пароль';
  }
  res.render('signin');
};

const userSignup = async (req, res) => {
  const {
    email, password: plainPass, password2, name, picture, role, teamid, departmentid,
  } = req.body;

  if (email && plainPass === password2 && name) {
    // хэшируем пароль
    const password = await bcrypt.hash(plainPass, saltRounds);
    const newUser = await db.User.create({
      email,
      password,
      name,
      picture,
      role,
      teamid,
      departmentid,
    });
    // { returning: true, plain: true });

    newUser.save();

    // установит в куку идентификатор с id из БД
    // req.session.user = {
    //   id: newUser.id,
    //   name: newUser.name,
    // };
    return res.redirect('/user/signup');
  }
  // если что-то не ввел обратно на страницу регистрации
  return res.status(418).redirect('/user/signup/?err=true');
};

const userSignin = async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const currentUser = await db.User.findOne({
      where: {
        email,
      },
    });

    if (currentUser && (await bcrypt.compare(password, currentUser.password))) {
      // установит в куку идентификатор с id из БД
      req.session.user = {
        role: currentUser.role,
        id: currentUser.id,
        name: currentUser.name,
      };
      res.locals.user = req.session.user;
      return res.redirect('/userhome');
    }
    return res.status(418).redirect('/user/signin/?err=true');
  }
  // если что-то не ввел обратно на страницу регистрации
  return res.status(418).redirect('/user/signin/?err=true').status(418);
};

const userSignout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.redirect('/');
    res.clearCookie(req.app.get('cookieName'));
    return res.redirect('/');
  });
};

module.exports = {
  userSignupRender,
  userSigninRender,
  userSignup,
  userSignin,
  userSignout,
};
