const { Router } = require('express');
const {
  userSignupRender,
  userSigninRender,
  userSignup,
  userSignin,
  userSignout,
} = require('../controllers/user.controller');
// const { checkAuth } = require('../middlewares/checkAuth');
// const db = require('../db/models');

const userRouter = Router();

userRouter.route('/signup')
  .get(userSignupRender)
  .post(userSignup);

userRouter.route('/signin')
  .get(userSigninRender)
  .post(userSignin);

userRouter.route('/signout')
  .get(userSignout);

// userRouter.get('/lk', checkAuth, async (req, res) => {
//   const allCategories = await db.Category.findAll();
//   const articlesByUser = await db.Article.findAll({
//     where: { userid: req.session.user.id },
//   });
//   res.render('user/lk', { articles: articlesByUser, categories: allCategories });
// });

module.exports = userRouter;
