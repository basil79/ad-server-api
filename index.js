const express = require('express');
const cors = require('cors');
const supplyTagsRouter = require('./routes/supply-tags');

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

app.use('/supply-tags', supplyTagsRouter);

app.listen(port, () => {
  console.log(`listening on port ${port}!`)
});
