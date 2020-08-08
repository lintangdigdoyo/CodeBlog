const express = require('express');
const router = express.Router();
const { auth } = require('../../middleware/auth');

//@route POST api/profile
//@desc Create user profile
//@access Private

router.post('/', auth, (req, res) => {});

module.exports = router;
