const express = require('express');
const router = express.Router();
const adserve = require('../models');
const verifyToken = require('../controllers/jwt');

router.get('/', [verifyToken], (req, res) => {

  const from = req.query.from;
  const size = req.query.size;
  const sortColumn = req.query.sort_column;
  const sortOrder = req.query.sort_order;

  adserve
    .userAccounts()
    .getMany(req.userId, from, size, sortColumn, sortOrder)
    .then(data => {
      res
        .json(data ? data : {});
    })
    .catch(err => {
      res
        .json({
          error: err.message
        });
    });

});


module.exports = router;
