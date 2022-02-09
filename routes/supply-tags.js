const express = require('express');
const router = express.Router();
const adserve = require('../models');


router.get('/', (req, res) => {

  const from = req.query.from;
  const size = req.query.size;
  const sortColumn = req.query.sort_column;
  const sortOrder = req.query.sort_order;

  adserve
    .supplyTags()
    .getMany(null, from, size, sortColumn, sortOrder)
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
router.get('/:id', (req, res) => {

  const id = req.params.id;

  adserve
    .supplyTags()
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
