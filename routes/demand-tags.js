const express = require('express');
const router = express.Router();
const adserve = require('../models');
const verifyToken = require('../controllers/jwt');

router.post('/', [verifyToken], (req, res) => {

  const id = req.body.id;
  const name = req.body.name;
  const supplyTagId = req.body.supply_tag_id;
  const vastUrl = req.body.vast_url;
  const tier = req.body.tier;
  const priority = req.body.priority;
  const cpm = req.body.cpm;
  const floor = req.body.floor;
  const timeout = req.body.timeout;
  const isActive = req.body.isActive;

  adserve
    .demandTags()
    .set(id, name, supplyTagId, vastUrl, tier, priority, cpm, floor, timeout, isActive)
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

  const supplyTagId = req.query.supply_tag_id;
  const from = req.query.from;
  const size = req.query.size;
  const sortColumn = req.query.sort_column;
  const sortOrder = req.query.sort_order;

  adserve
    .demandTags()
    .getMany(null, supplyTagId, from, size, sortColumn, sortOrder)
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
    .get(id)
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
