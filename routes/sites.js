const express = require('express');
const router = express.Router();
const adserve = require('../models');
const verifyToken = require('../controllers/jwt');

router.get('/', [verifyToken], (req, res) => {

  const accountId = req.query.account_id;
  const supplyAccountId = req.query.supply_account_id;

  const from = req.query.from;
  const size = req.query.size;
  const sortColumn = req.query.sort_column;
  const sortOrder = req.query.sort_order;

  adserve
    .sites()
    .getMany(null, supplyAccountId, accountId, from, size, sortColumn, sortOrder)
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
  const supplyAccountId = req.query.supply_account_id;
  const accountId = req.query.account_id;

  adserve
    .sites()
    .get(id, supplyAccountId, accountId)
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
