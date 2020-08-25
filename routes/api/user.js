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

//@route patch api/user
//@desc edit signed in user
//@access Private

router.patch(
  '/',
  auth,
  [
    check('name', 'Please enter the name').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check(
      'password',
      'Please enter password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findById(req.user.id);

      if (user.googleId) {
        if (name) user.name = name;
        if (password) {
          const salt = await bcrypt.genSalt(10);
          const newPassword = await bcrypt.hash(password, salt);
          user.password = newPassword;
        }

        await user.save();
        return res.json({ msg: 'User updated' });
      }

      if (name) user.name = name;
      if (email) user.email = email;
      if (password) {
        const salt = await bcrypt.genSalt(10);
        const newPassword = await bcrypt.hash(password, salt);
        user.password = newPassword;
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

router.delete('/', auth, async (req, res) => {
  try {
    await Post.deleteMany({ user: req.user.id });
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findByIdAndRemove(req.user.id);

    res.json({ msg: 'User removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
