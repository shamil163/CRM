require('dotenv').config();
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const hbs = require('hbs');
const redis = require('redis');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);


//импорт роутов
const userRouter = require('./src/routes/user.router');
const employeesRouter = require('./src/routes/employees.router');
const indexRouter = require('./src/routes/index.router');
const departmentRouter = require('./src/routes/department.router');
const teamRouter = require('./src/routes/team.router');
const { checkAuthForAdmin, checkAuthForNavbar } = require('./src/middlewares/checkAuth');

const redisClient = redis.createClient();

const app = express();
const PORT = 3000;
//const { secretKey } = process.env;

// view engine setup
app.set('view engine', 'hbs');
app.set('cookieName', 'sid');
hbs.registerPartials(path.join(process.env.PWD, 'src', 'views', 'partials'));
app.set('views', path.join(process.env.PWD, 'src', 'views'));

//проверка на супер-юзера
hbs.registerHelper('roleCheck', (user) => {
  if (user.role === 'admin') {
    return true;
  }
  return false;
});


app.use(session({
  name: app.get('cookieName'),
  secret: 'secretKey',
  resave: false,
  saveUninitialized: false,
  store: new RedisStore({ client: redisClient }, {
    secret: 'secretKey',
  }),
  cookie: {
    httpOnly: true,
    maxAge: 86400 * 1e3,
  },
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.env.PWD, 'public')));

// глобальный middleware, проверяет залогинен ли юзер
app.use(checkAuthForAdmin);
app.use(checkAuthForNavbar);


//адреса на роуты
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/employees', employeesRouter);
app.use('/departments', departmentRouter);
app.use('/teams', teamRouter);


//запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на :${PORT} порту`);
});
