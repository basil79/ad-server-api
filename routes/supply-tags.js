const express = require('express');
const router = express.Router();
const adserve = require('../models');

router.get('/:id', (req, res) => {

  const id = req.params.id;

  console.log('get supply tag by id', id);

  adserve
    .supplyTags()
    .get(id)
    .then(data => {
      console.log('data', data);
      res.end();

    })
    .catch(err => {
      res
        //.set('Content-Type', 'application/json')
        .json({
          error: err.message
        });
    });

});


module.exports = router;
