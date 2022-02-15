const express = require('express');
const router = express.Router();
const adserve = require('../models');
const verifyToken = require('../controllers/jwt');


router.post('/', [verifyToken], (req, res) => {

  const id = req.body.id;
  const name = req.body.name;
  const isActive = req.body.isActive;

  if(id || name) {
    // Set/Update
    adserve
      .supplyTags()
      .set(id, name, isActive)
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

  } else {
    res.json({
      error: 'please provide id or name'
    });
  }

});

router.get('/', [verifyToken], (req, res) => {

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
router.get('/:id',[verifyToken], (req, res) => {

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
