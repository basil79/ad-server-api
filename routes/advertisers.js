const express = require('express');
const router = express.Router();
const adserve = require('../models');
const verifyToken = require('../controllers/jwt');

router.get('/', [verifyToken], (req, res) => {

  const accountId = req.query.account_id;
  const demandAccountId = req.query.demand_account_id;

  const from = req.query.from;
  const size = req.query.size;
  const sortColumn = req.query.sort_column;
  const sortOrder = req.query.sort_order;

  adserve
    .advertisers()
    .getMany(null, demandAccountId, accountId, from, size, sortColumn, sortOrder)
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

router.get('/:id', [verifyToken], (req, res) => {

  const id = req.params.id;
  const demandAccountId = req.query.demand_account_id;
  const accountId = req.query.account_id;

  adserve
    .advertisers()
    .get(id, demandAccountId, accountId)
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
