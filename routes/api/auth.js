const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

require('../../services/passport');

const passportJWT = passport.authenticate('jwt', { session: false });

//@route GET api/auth/google & api/auth/google/callback
//@desc SignIn/SignUp with google OAuth
//@access Public

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    try {
      const payload = {
        user: {
          id: req.user.id,
        },
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 24 * 60 * 60,
      });

      res.cookie('access_token', token).redirect('/');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route GET api/auth/signout
//@desc SignIn/SignUp with google OAuth
//@access Public

router.get('/signout', passportJWT, async (req, res) => {
  res.clearCookie('access_token').json({ msg: 'user signed out' });
});

module.exports = router;
