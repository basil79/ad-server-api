const express = require('express');
const router = express.Router();
const adserve = require('../models');
const verifyToken = require('../controllers/jwt');

router.post('/', [verifyToken], (req, res) => {

  const id = req.body.id;
  const name = req.body.name;
  const demandAccountId = req.body.demandAccountId;
  const advertiserId = req.body.advertiserId;
  const accountId = req.body.accountId;
  const vastUrl = req.body.vastUrl;
  const tier = req.body.tier;
  const priority = req.body.priority;
  const cpm = req.body.cpm;
  const floor = req.body.floor;
  const timeout = req.body.timeout;
  const isActive = req.body.isActive;

  adserve
    .demandTags()
    .set(id, name, demandAccountId, advertiserId, accountId, vastUrl, tier, priority, cpm, floor, timeout, isActive)
    .then(data => {
      if(data) {
        res.json({
          id: data
        });
      } else {
        res.json({
          error: 'error'
        });
      }
    })
    .catch(err => {
      res
        .json({
          error: err.message
        });
    });

});

router.get('/', [verifyToken], (req, res) => {

  const demandAccountId = req.query.demand_account_id;
  const advertiserId = req.query.advertiser_id;
  const accountId = req.query.account_id;

  const from = req.query.from;
  const size = req.query.size;
  const sortColumn = req.query.sort_column;
  const sortOrder = req.query.sort_order;

  adserve
    .demandTags()
    .getMany(null, demandAccountId, advertiserId, accountId, from, size, sortColumn, sortOrder)
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

  adserve
    .demandTags()
    .get(id, null, null)
    .then(data => {
      console.log(data);
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
