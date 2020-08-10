const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { auth } = require('../../middleware/auth');
const checkObjectId = require('../../middleware/checkObjectId');
const upload = require('../../middleware/upload');

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
        //await unlink(req.file.path)
        return res
          .status(400)
          .json({ errors: [{ msg: 'Profile already exist' }] });
      }

      if (user.avatar) {
        //await fs.unlink(user.avatar)
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

//@route GET api/profiles/:userId
//@desc Get user profile
//@access Public

router.get('/:userId', checkObjectId('userId'), async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.userId,
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

//@route PATCH api/profiles/:userId
//@desc update profile
//@access Private

router.patch(
  '/:userId',
  auth,
  checkObjectId('userId'),
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

    const { country, location, status, skills, bio, avatar } = req.body;

    try {
      let profile = await Profile.findOne({ user: req.params.userId });
      let user = await User.findById(req.user.id);

      if (!profile) {
        //await unlinkAsync(req.file.path)
        return res
          .status(400)
          .json({ msg: 'There is no profile for this user' });
      }

      if (req.params.userId !== req.user.id) {
        //await unlinkAsync(req.file.path)
        return res.status(401).json({ errors: [{ msg: 'Unauthorized user' }] });
      }

      const newSkills = skills.split(',').map((skill) => skill.trim());
      console.log(profile);

      if (country) profile.country = country;
      if (location) profile.location = location;
      if (status) profile.status = status;
      if (skills) profile.skills = newSkills;
      if (bio) profile.bio = bio;

      // if (req.file) {
      //   user = new User({
      //     avatar: req.file.path,
      //   });
      //   await user.save();
      // }

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route POST api/profiles/:userId/educations
//@desc add education
//@access Private

router.post(
  '/:userId/educations',
  auth,
  [check('school', 'Please enter the school name').not().isEmpty()],
  checkObjectId('userId'),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { school, degree, start, current, end } = req.body;

    try {
      let profile = await Profile.findOne({ user: req.params.userId });

      if (!profile) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'There is no profile for this user' }] });
      }

      if (req.params.userId !== req.user.id) {
        return res.status(401).json({ errors: [{ msg: 'Unauthorized user' }] });
      }

      profile.education.push({ school, degree, start, current, end });

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route PATCH api/profiles/:userId/educations/:educationId
//@desc update education
//@access Private

router.patch(
  '/:userId/educations/:educationId',
  auth,
  [check('school', 'Please enter the school name').not().isEmpty()],
  checkObjectId('userId'),
  checkObjectId('educationId'),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { school, degree, start, current, end } = req.body;

    try {
      let profile = await Profile.findOne({ user: req.params.userId });

      if (!profile) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'There is no profile for this user' }] });
      }

      if (req.params.userId !== req.user.id) {
        return res.status(401).json({ errors: [{ msg: 'Unauthorized user' }] });
      }

      if (profile.education.length === 0) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User has no education record' }] });
      }

      let newEducation = profile.education.filter(
        (education) => education.id === req.params.educationId
      );

      if (newEducation.length === 0) {
        return res.status(400).json({ errors: [{ msg: 'Invalid id' }] });
      }

      if (school) newEducation[0].school = school;
      if (degree) newEducation[0].degree = degree;
      if (start) newEducation[0].start = start;
      if (current) newEducation[0].current = current;
      if (end) newEducation[0].end = end;

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
