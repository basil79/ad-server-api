const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const accountsRouter = require('./routes/accounts');
const userAccountsRouter = require('./routes/user-accounts');
const supplyAccountsRouter = require('./routes/supply-accounts');
const sitesRouter = require('./routes/sites');
const supplyTagsRouter = require('./routes/supply-tags');
const demandTagsRouter = require('./routes/demand-tags');

const app = express();
const port = normalizePort(process.env.PORT || '8083');

function normalizePort(val) {
  const _port = parseInt(val, 10);

  if(isNaN(_port)) {
    return val;
  }

  if(_port >= 0) {
    return _port;
  }

  return false;
}

app.use(cors({
  origin: function(origin, callback) {
    return callback(null, true);
  },
  optionsSuccessStatus: 200,
  credentials: true
}));
app.use(cookieParser());
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  );
  next();
});
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/accounts', accountsRouter);
app.use('/user-accounts', userAccountsRouter);
app.use('/supply-accounts', supplyAccountsRouter);
app.use('/sites', sitesRouter);
app.use('/supply-tags', supplyTagsRouter);
app.use('/demand-tags', demandTagsRouter);

app.listen(port, () => {
  console.log(`listening on port ${port}!`)
});
