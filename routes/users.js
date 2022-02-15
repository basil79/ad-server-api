const express = require('express');
const router = express.Router();
const adserve = require('../models');
const verifyToken = require('../controllers/jwt');
const bcrypt = require('bcryptjs');

router.post('/', [verifyToken], (req, res) => {

  const id = req.body.id;
  const email = req.body.email;
  //const password = bcrypt.hashSync(req.body.password, 8);
  const isActive = req.body.isActive;

  if(id) {
    // Set/Update
    adserve
      .users()
      .set(id, null, email, null, isActive)
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
        res.json({
          error: err.message
        });
      });

  } else {
    res.json({
      error: 'please provide id'
    });
  }
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
