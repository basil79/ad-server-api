const express = require('express');
const router = express.Router();
const adserve = require('../models');
const verifyToken = require('../controllers/jwt');

router.post('/', [verifyToken], (req, res) => {



});

router.get('/', [verifyToken], (req, res) => {

  const from = req.query.from;
  const size = req.query.size;
  const sortColumn = req.query.sort_column;
  const sortOrder = req.query.sort_order;

  adserve
    .users()
    .getMany(null, null, null, null, from, size, sortColumn, sortOrder)
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
    .users()
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
