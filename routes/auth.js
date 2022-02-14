const express = require('express');
const router = express.Router();
const adserve = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config.json');

router.post('/register', (req, res) => {

  const username = req.body.username;
  const email = req.body.email;
  const password = bcrypt.hashSync(req.body.password, 8);

  console.log(username, email, password);

  if(username && email && password) {

    // Check for duplication username or email
    adserve
      .users()
      .get(null, username, email, null)
      .then(user => {
        if(!user) {
          // Set
          adserve
            .users()
            .set(null, username, email, password, 1)
            .then(data => {
              res
                .json({
                  id: data
                });
            })
            .catch(err => {
              res
                .json({
                  error: err.message
                });
            })
        } else {
          res
            .json({
              error: 'username or email already exists'
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
      error: 'please provide username, email, password'
    });
  }

});

router.post('/login', (req, res) => {

  const username = req.body.username;
  const password = req.body.password;

  adserve
    .users()
    .get(null, username, null, null)
    .then(user => {
      if(user) {
        // Validate password
        const passwordIsValid = bcrypt.compareSync(
          password,
          user.password
        );
        if (!passwordIsValid) {
          return res
            .json({
              error: 'invalid password'
            })
        }

        console.log('password correct !!!!!!!!');
        const token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400 // 24 hours
        });

        console.log(token);
        res
          .json({
            id: user.id,
            username: user.username,
            email: user.email,
            accessToken: token
          })

      } else {
        // User not found
        res
          .json({
            error: 'user not found'
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

module.exports = router;
