const express = require('express');
const cors = require('cors');

const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
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
app.use(express.json());
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/supply-tags', supplyTagsRouter);
app.use('/demand-tags', demandTagsRouter);

app.listen(port, () => {
  console.log(`listening on port ${port}!`)
});
