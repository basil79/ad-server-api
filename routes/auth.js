const express = require('express');
const router = express.Router();
const adserve = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config.json');
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const verifyToken = require('../controllers/jwt');

router.post('/register', (req, res) => {

  const username = req.body.username;
  const email = req.body.email;
  const password = bcrypt.hashSync(req.body.password, 8);
  const twoFactorAuthentication = Boolean(req.body.twoFactorAuthentication);

  // 2FA
  let secret = null;

  if(username && email && password) {

    // Check for duplication username or email
    adserve
      .users()
      .get(null, username, null)
      .then(user => {
        if(!user) {

          // Check if user enabled for 2FA
          if(twoFactorAuthentication) {
            // 2FA generate secret
            secret = speakeasy.generateSecret({
              name: 'AdServe'
            });
          }

          // Set
          adserve
            .users()
            .set(null, username, email, password, twoFactorAuthentication, (secret ? secret.base32 : null), 1)
            .then(data => {

              // Check if 2FA secret exists
              if(secret) {

                res
                  .json({
                    id: data,
                    otpauthUrl: secret.otpauth_url,
                    base32: secret.base32
                  });

              } else {

                res
                  .json({
                    id: data
                  });
              }

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
  const twoFactorToken = req.body.token;

  adserve
    .users()
    .get(null, username, null)
    .then(user => {
      if(user) {
        // Check if user not active
        if(!user.isActive) {
          return res
            .status(500)
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
            .status(500)
            .json({
              error: 'invalid password'
            })
        }

        // Check if user has 2FA
        if(user.twoFactorAuthentication) {
          if(!twoFactorToken) {
            return res
              .status(500)
              .json({
                error: 'please provide 2fA token'
              });
          }

          // Validate 2FA token
          const tokenValidates = speakeasy.totp.verify({
            secret: user.twoFactorAuthenticationSecret,
            encoding: 'base32',
            token: twoFactorToken,
          });

          if(!tokenValidates) {
            return res
              .status(500)
              .json({
                error: '2FA token invalid'
              });
          }

        }

        const token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: config.expiresIn // 43200 sec - 12 hours, 86400 sec - 24 hours
        });

        // Store token in cookies
        let options = {
          //path:"/",
          //sameSite:true,
          maxAge: 1000 * 60 * 60 * Math.floor(config.expiresIn / (60*60)), // would expire after 12 hours
          httpOnly: false // true, The cookie only accessible by the web server
        }

        res
          .cookie('x-access-token', token, options)
          .json({
            id: user.id,
            username: user.username,
            email: user.email,
            accessToken: token
          });

      } else {
        // User not found
        res
          .status(500)
          .json({
            error: 'user not found'
          });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({
          error: err.message
        });
    });

});

// logout
router.post('/logout', [verifyToken], (req, res) => {

  console.log('logout');
  res
    .clearCookie('x-access-token')
    .json({});

});

// 2 two-factor authentication
router.post('/2fa/generate', (req, res) => {

  const otpauthUrl = req.body.otpauthUrl;

  if(otpauthUrl) {
    // otpauth://totp/AdServe?secret=OM4DKTSWH5DTAVBTIQ7GWQDBM5FSG6DFNNKSSV2FNRWE4ZB4J55A
    QRCode.toDataURL(otpauthUrl, function(err, data_url) {
      console.log(data_url);

      // Display this data URL to the user in an <img> tag
      // Example:
      // res.end('<img src="' + data_url + '">');
      res.json({
        qr: data_url
      });
    });
  } else {
    res.json({
      error: 'otpauth not provided'
    });
  }

});

router.post('/2fa/verify', (req, res) => {

  const token = req.body.token; // 123456
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
