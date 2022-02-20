const express = require('express');
const router = express.Router();
const adserve = require('../models');
const verifyToken = require('../controllers/jwt');


router.post('/', [verifyToken], (req, res) => {

  const id = req.body.id;
  const name = req.body.name;
  const accountId = req.body.accountId;
  const isActive = req.body.isActive;

  adserve
    .supplyTags()
    .set(id, name, accountId, isActive)
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

  const accountId = req.query.accountId;

  const from = req.query.from;
  const size = req.query.size;
  const sortColumn = req.query.sort_column;
  const sortOrder = req.query.sort_order;

  adserve
    .supplyTags()
    .getMany(null, accountId, from, size, sortColumn, sortOrder)
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

router.get('/:id',[verifyToken], (req, res) => {

  const id = req.params.id;

  adserve
    .supplyTags()
    .get(id, null)
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
