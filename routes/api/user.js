const express = require('express');
const router = express.Router();
const { auth } = require('../../middleware/auth');

const User = require('../../models/User');

//@route GET api/user
//@desc Get signed in user
//@access Private

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
