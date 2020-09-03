const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { auth } = require('../../middleware/auth');
const checkObjectId = require('../../middleware/checkObjectId');
const upload = require('../../middleware/upload');
const fs = require('fs');

const Profile = require('../../models/Profile/Profile');
const User = require('../../models/User');

//@route POST api/profiles
//@desc Create user profile
//@access Private

router.post('/', auth, upload.single('avatar'), async (req, res) => {
  const { country, location, status, website, skills, bio } = req.body;

  const errors = [];
  if (country === '') {
    errors.push({ msg: 'Please enter your country name', param: 'country' });
  }
  if (status === '') {
    errors.push({
      msg: 'Please enter your professional status',
      param: 'status',
    });
  }
  if (skills === '') {
    errors.push({ msg: 'Please enter skills', param: 'skills' });
  }
  if (errors.length > 0) {
    return res.status(400).json({ errors: errors });
  }

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
      website,
      skills: newSkills,
      bio,
    });

    if (req.file) {
      if (user.avatar) {
        fs.unlink(user.avatar, (err) => {
          if (err) {
            console.error(err);
            return;
          }
          //file removed
        });
      }
      user.avatar = req.file.path;
      await user.save();
    }

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route GET api/profiles/:userId
//@desc Get user profile
//@access Public

router.get('/:userId', checkObjectId('userId'), async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.userId,
    })
      .populate('user', ['name', 'avatar'])
      .populate('follower.user', ['name', 'avatar'])
      .populate('following.user', ['name', 'avatar']);

    if (!profile) {
      return res.status(404).json({ msg: 'Profile not found' });
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
    check('name', 'Please enter your name').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { country, location, status, website, skills, bio, name } = req.body;

    try {
      let profile = await Profile.findOne({
        user: req.params.userId,
      }).populate('user', ['name', 'avatar']);
      let user = await User.findById(req.user.id);

      if (!profile) {
        return res
          .status(400)
          .json({ msg: 'There is no profile for this user' });
      }

      if (req.params.userId !== req.user.id) {
        return res.status(401).json({ errors: [{ msg: 'Unauthorized user' }] });
      }

      const newSkills = skills.split(',').map((skill) => skill.trim());

      if (country) profile.country = country;
      if (location || location === '') profile.location = location;
      if (status) profile.status = status;
      if (website || website === '') profile.website = website;
      if (skills) profile.skills = newSkills;
      if (bio || bio === '') profile.bio = bio;
      if (name) {
        profile.user.name = name;
        user.name = name;
        await user.save();
      }

      if (req.file) {
        if (user.avatar) {
          fs.unlink(user.avatar, (err) => {
            if (err) {
              console.error(err);
              return;
            }
            //file removed
          });
        }
        profile.user.avatar = req.file.path;
        user.avatar = req.file.path;
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

//@route POST api/profiles/:userId/educations
//@desc add education
//@access Private

router.post(
  '/:userId/educations',
  auth,
  [
    check('school', 'Please enter the school name').not().isEmpty(),
    check('startYear', 'Please enter the start year').not().isEmpty(),
  ],
  checkObjectId('userId'),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { school, degree, startYear, current, endYear } = req.body;

    try {
      let profile = await Profile.findOne({
        user: req.params.userId,
      }).populate('user', ['name', 'avatar']);

      if (!profile) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'There is no profile for this user' }] });
      }

      if (req.params.userId !== req.user.id) {
        return res.status(401).json({ errors: [{ msg: 'Unauthorized user' }] });
      }

      profile.education.push({ school, degree, startYear, current, endYear });

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
  checkObjectId('userId'),
  checkObjectId('educationId'),
  [check('school', 'Please enter the school name').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { school, degree, startYear, current, endYear } = req.body;

    try {
      const profile = await Profile.findOne({
        user: req.params.userId,
      }).populate('user', ['name', 'avatar']);

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

      let updateEducation = profile.education.filter(
        (education) => education.id === req.params.educationId
      );

      if (updateEducation.length === 0) {
        return res.status(400).json({ errors: [{ msg: 'Invalid id' }] });
      }

      if (school) updateEducation[0].school = school;
      if (degree || degree === '') updateEducation[0].degree = degree;
      if (startYear) updateEducation[0].startYear = startYear;
      if (typeof current !== 'undefined') {
        updateEducation[0].current = current;
        updateEducation[0].endYear = '';
      }
      if (endYear) {
        updateEducation[0].endYear = endYear;
        updateEducation[0].current = false;
      }

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route DELETE api/profiles/:userId/educations/:educationId
//@desc delete an education
//@access Private

router.delete(
  '/:userId/educations/:educationId',
  auth,
  checkObjectId('userId'),
  checkObjectId('educationId'),
  async (req, res) => {
    try {
      const profile = await Profile.findOne({
        user: req.params.userId,
      }).populate('user', ['name', 'avatar']);

      if (!profile) {
        return res
          .status(400)
          .json({ Errors: [{ msg: 'There is no profile for this user' }] });
      }

      if (req.params.userId !== req.user.id) {
        return res.status(401).json({ errors: [{ msg: 'Unauthorized user' }] });
      }

      if (profile.education.length === 0) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User has no education record' }] });
      }

      let deleteIndex = profile.education
        .map((education) => education.id)
        .indexOf(req.params.educationId);

      if (deleteIndex < 0) {
        return res.status(400).json({ errors: [{ msg: 'Invalid id' }] });
      }

      profile.education.splice(deleteIndex, 1);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route POST api/profiles/:userId/experiences
//@desc Add Experience
//@access Private

router.post(
  '/:userId/experiences',
  auth,
  checkObjectId('userId'),
  [
    check('job', 'Please enter the job title').not().isEmpty(),
    check('location', 'Please enter the location').not().isEmpty(),
    check('company', 'Please enter the company name').not().isEmpty(),
    check('start', 'Please enter the start date').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { job, company, location, start, current, end } = req.body;

    try {
      let profile = await Profile.findOne({
        user: req.params.userId,
      }).populate('user', ['name', 'avatar']);

      if (!profile) {
        return res
          .status(500)
          .json({ errors: [{ msg: 'There is no profile for this user' }] });
      }

      if (req.params.userId !== req.user.id) {
        return res.status(401).json({ errors: [{ msg: 'Unauthorized user' }] });
      }

      profile.experience.push({ job, company, location, start, current, end });

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route PATCH api/profiles/:userId/experiences/:experienceId
//@desc Update Experience
//@access Private

router.patch(
  '/:userId/experiences/:experienceId',
  auth,
  checkObjectId('userId'),
  checkObjectId('experienceId'),
  [
    check('job', 'Please enter the job title').not().isEmpty(),
    check('location', 'Please enter the location').not().isEmpty(),
    check('company', 'Please enter the company name').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { job, company, location, start, current, end } = req.body;

    try {
      const profile = await Profile.findOne({
        user: req.params.userId,
      }).populate('user', ['name', 'avatar']);

      if (!profile) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'There is no profile for this user' }] });
      }

      if (profile.experience.length === 0) {
        return res.status(400).json({
          errors: [{ msg: 'There is no experience record for this user' }],
        });
      }

      let updateExperience = profile.experience.filter(
        (experience) => experience.id === req.params.experienceId
      );

      if (updateExperience.length === 0) {
        return res.status(400).json({ errors: [{ msg: 'Invalid id' }] });
      }

      if (job) updateExperience[0].job = job;
      if (company) updateExperience[0].company = company;
      if (location) updateExperience[0].location = location;
      if (start) updateExperience[0].start = start;
      if (typeof current !== 'undefined') {
        updateExperience[0].current = current;
        updateExperience[0].end = '';
      }
      if (end) {
        updateExperience[0].end = end;
        updateExperience[0].current = false;
      }

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route DELETE api/profiles/:userId/experiences/:experienceId
//@desc Delete Experience
//@access Private

router.delete(
  '/:userId/experiences/:experienceId',
  auth,
  checkObjectId('userId'),
  checkObjectId('experienceId'),
  async (req, res) => {
    try {
      const profile = await Profile.findOne({
        user: req.params.userId,
      }).populate('user', ['name', 'avatar']);

      if (!profile) {
        return res
          .status(400)
          .json({ error: [{ msg: 'There is no profile for this user' }] });
      }

      if (profile.experience === 0) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'There is no experience record' }] });
      }

      let deleteIndex = profile.experience
        .map((experience) => experience.id)
        .indexOf(req.params.experienceId);

      if (deleteIndex < 0) {
        return res.status(400).json({ errors: [{ msg: 'Invalid id' }] });
      }

      profile.experience.splice(deleteIndex, 1);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route POST api/profiles/:userId/follow
//@desc follow a user
//@access Private

router.post(
  '/:userId/follow',
  auth,
  checkObjectId('userId'),
  async (req, res) => {
    try {
      let profile = await Profile.findOne({
        user: req.params.userId,
      });

      const userProfile = await Profile.findOne({ user: req.user.id });

      if (!profile) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'There is no profile for this user' }] });
      }

      if (req.user.id === req.params.userId) {
        return res.status(400).json({ errors: [{ msg: 'Bad request' }] });
      }

      if (
        profile.follower.filter(
          (follower) => follower.user.toString() === req.user.id
        ).length > 0
      ) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already followed' }] });
      }

      profile.follower.push({ user: req.user.id });
      userProfile.following.push({ user: req.params.userId });

      await profile.save();
      await userProfile.save();

      profile = await Profile.findOne({
        user: req.params.userId,
      })
        .populate('user', ['name', 'avatar'])
        .populate('follower.user', ['name', 'avatar'])
        .populate('following.user', ['name', 'avatar']);

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route DELETE api/profiles/:userId/follow
//@desc unfollow a user
//@access Private

router.delete(
  '/:userId/follow',
  auth,
  checkObjectId('userId'),
  async (req, res) => {
    try {
      let profile = await Profile.findOne({
        user: req.params.userId,
      });

      const userProfile = await Profile.findOne({ user: req.user.id });

      if (!profile) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'There is no profile for this user' }] });
      }

      if (req.user.id === req.params.userId) {
        return res.status(400).json({ errors: [{ msg: 'Bad request' }] });
      }

      if (
        profile.follower.filter(
          (follower) => follower.user.toString() === req.user.id
        ).length === 0
      ) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already unfollowed' }] });
      }

      const deleteIndex = profile.follower
        .map((follower) => follower.user.toString())
        .indexOf(req.params.userId);

      const deleteIndexUser = userProfile.following
        .map((following) => following.user.toString())
        .indexOf(req.user.id);

      profile.follower.splice(deleteIndex, 1);
      userProfile.following.splice(deleteIndexUser, 1);

      await profile.save();
      await userProfile.save();

      profile = await Profile.findOne({
        user: req.params.userId,
      })
        .populate('user', ['name', 'avatar'])
        .populate('follower.user', ['name', 'avatar'])
        .populate('following.user', ['name', 'avatar']);

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
