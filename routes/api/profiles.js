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
  // [
  //   check('country', 'Please enter your country name').not().isEmpty(),
  //   check('status', 'Please enter your professional status').not().isEmpty(),
  //   check('skills', 'Please enter skills').not().isEmpty(),
  // ],
  upload.single('avatar'),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { country, location, status, skills, bio } = JSON.parse(
      req.body.data
    );

    console.log(JSON.parse(req.body.data));
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
        await fs.unlink(user.avatar);
        console.log('file deleted successfully');
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

//@route GET api/profiles/:userId
//@desc Get user profile
//@access Public

router.get('/:userId', checkObjectId('userId'), async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.userId,
    }).populate('user', ['name', 'avatar']);

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
  checkObjectId('userId'),
  checkObjectId('educationId'),
  [check('school', 'Please enter the school name').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { school, degree, start, current, end } = req.body;

    try {
      const profile = await Profile.findOne({ user: req.params.userId });

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
      if (degree) updateEducation[0].degree = degree;
      if (start) updateEducation[0].start = start;
      if (current) updateEducation[0].current = current;
      if (end) updateEducation[0].end = end;

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
      const profile = await Profile.findOne({ user: req.params.userId });

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
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { job, company, location, start, current, end } = req.body;

    try {
      let profile = await Profile.findOne({ user: req.params.userId });

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
      const profile = await Profile.findOne({ user: req.params.userId });

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
      if (current) updateExperience[0].current = current;
      if (end) updateExperience[0].end = end;

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
      const profile = await Profile.findOne({ user: req.params.userId });

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

module.exports = router;
