const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { auth } = require('../../middleware/auth');
const checkObjectId = require('../../middleware/checkObjectId');
const upload = require('../../middleware/multer');

const Profile = require('../../models/Profile/Profile');
const User = require('../../models/User');

//@route POST api/profiles
//@desc Create user profile
//@access Private

router.post(
  '/',
  auth,
  [
    check('country', 'Please enter your country').not().isEmpty(),
    check('status', 'Please enter your professional status').not().isEmpty(),
    check('skills', 'Please enter skills').not().isEmpty(),
  ],
  upload.single('avatar'),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { country, location, status, skills, bio, avatar } = req.body;
    try {
      let profile = await Profile.findOne({ user: req.user.id });
      let user = await User.findById(req.user.id);

      if (profile) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Profile already exist' }] });
      }

      const newSkills = skills.split(',').map((skill) => skill.trim());

      profile = new Profile({
        user: req.user.id,
        country,
        location,
        status,
        skills: newSkills,
        bio,
      });

      if (req.file) {
        user = new User({
          avatar: req.file.path,
        });
        await user.save();
      }

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route GET api/profiles/:user
//@desc Get user profile
//@access Public

router.get('/:user', checkObjectId('user'), async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route GET api/profiles
//@desc Get all profiles
//@access Public

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);

    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route PATCH api/profiles/:user
//@desc update profile
//@access Public

router.patch(
  '/:user',
  auth,
  checkObjectId('user'),
  upload.single('avatar'),
  [
    check('country', 'Please enter your country').not().isEmpty(),
    check('status', 'Please enter your professional status').not().isEmpty(),
    check('skills', 'Please enter skills').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (req.params.user !== req.user.id) {
      return res.status(401).json({ errors: [{ msg: 'Unauthorized user' }] });
    }

    const { country, location, status, skills, bio, avatar } = req.body;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      let user = await User.findById(req.user.id);

      if (!profile) {
        return res
          .status(400)
          .json({ msg: 'There is no profile for this user' });
      }

      const newSkills = skills.split(',').map((skill) => skill.trim());

      profile = new Profile({
        country,
        location,
        status,
        skills: newSkills,
        bio,
        avatar,
      });

      if (req.file) {
        user = new User({
          avatar: req.file.path,
        });
        await user.save();
      }

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
