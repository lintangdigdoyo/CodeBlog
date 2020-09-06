const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { auth } = require('../../middleware/auth');
const checkObjectId = require('../../middleware/checkObjectId');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const Profile = require('../../models/Profile/Profile');
const Post = require('../../models/Post/Post');

//@route GET api/user
//@desc Get signed in user
//@access Private

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select('-password')
      .select('-date')
      .select('-__v');

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route GET api/user/password
//@desc Get password
//@access Private

router.get('/password', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select('-date')
      .select('-__v');

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route patch api/user
//@desc edit signed in user
//@access Private

router.patch(
  '/',
  auth,
  [
    check('email', 'Please enter a valid email').isEmail(),
    check('currentPassword', 'Please enter the current password')
      .not()
      .isEmpty(),
    check(
      'newPassword',
      'Please enter password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, currentPassword, newPassword } = req.body;

    try {
      let user = await User.findById(req.user.id);

      const isMatch = await bcrypt.compare(currentPassword, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Current password invalid' }] });
      }

      if (user.googleId) {
        if (newPassword) {
          const salt = await bcrypt.genSalt(10);
          const newPasswordCreated = await bcrypt.hash(newPassword, salt);
          user.password = newPasswordCreated;
        }

        await user.save();
        return res.json({ msg: 'User updated' });
      }

      if (email) user.email = email;
      if (newPassword) {
        const salt = await bcrypt.genSalt(10);
        const newPasswordCreated = await bcrypt.hash(newPassword, salt);
        user.password = newPasswordCreated;
      }

      await user.save();
      res.json({ msg: 'User updated' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route DELETE api/user
//@desc Delete user account
//@access Private

router.delete(
  '/',
  auth,
  check('password', 'Please enter the password').not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { password } = req.body;

    try {
      const user = await User.findById(req.user.id);

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Current password invalid' }] });
      }

      await Post.deleteMany({ user: req.user.id });
      await Profile.findOneAndRemove({ user: req.user.id });
      await User.findByIdAndRemove(req.user.id);

      res.json({ msg: 'User removed' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
