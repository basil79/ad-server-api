const express = require('express');
const router = express.Router();
const adserve = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config.json');
const speakeasy = require('speakeasy');
const QRCode = require("qrcode");

router.post('/register', (req, res) => {

  const username = req.body.username;
  const email = req.body.email;
  const password = bcrypt.hashSync(req.body.password, 8);
  const useTwoFactorAuthentication = req.body.use_two_factor_authentication;

  if(username && email && password) {

    // Check for duplication username or email
    adserve
      .users()
      .get(null, username, null, null)
      .then(user => {
        if(!user) {

          // TODO:
          // Set
          adserve
            .users()
            .set(null, username, email, password, 1)
            .then(data => {

              // TODO: check if user enabled for 2FA
              // 2FA
              var secret = speakeasy.generateSecret({
                name: 'AdServe'
              });

              res
                .json({
                  id: data,
                  otpauthUrl: secret.otpauth_url,
                  base32: secret.base32 // TODO: store to user
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
              error: 'username already exists'
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
        // Check if user not active
        if(!user.isActive) {
          return res
            .json({
              error: 'user not active'
            });
        }
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

        const token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: config.expiresIn // 43200 sec - 12 hours, 86400 sec - 24 hours
        });

        res
          .json({
            id: user.id,
            username: user.username,
            email: user.email,
            accessToken: token
          });

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

// 2 two-factor authentication
router.post('/2fa/generate', (req, res) => {

  const otpauthUrl = req.body.otpauth_url

  if(otpauthUrl) {
    // otpauth://totp/AdServe?secret=OM4DKTSWH5DTAVBTIQ7GWQDBM5FSG6DFNNKSSV2FNRWE4ZB4J55A
    QRCode.toDataURL(otpauthUrl, function(err, data_url) {
      console.log(data_url);

      // Display this data URL to the user in an <img> tag
      // Example:
      res.end('<img src="' + data_url + '">');
    });
  } else {
    res.json({
      error: 'otpauth not provided'
    });
  }

});

router.post('/2fa/verify', (req, res) => {

  const token = req.body.token;
  const secret = req.body.secret; // TODO: get from user

  if(token) {

    const tokenValidates = speakeasy.totp.verify({
      secret: secret,
      encoding: 'base32',
      token: token,
    });

    res.json({
      verified: tokenValidates
    });

  } else {
    res.json({
      error: 'user token not provided'
    });
  }

});

module.exports = router;
