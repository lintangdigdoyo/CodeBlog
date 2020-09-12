const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { auth } = require('../../middleware/auth');

const ChatRoom = require('../../models/Chat/ChatRoom');

//@route POST api/chats/userId
//@desc Create a new message
//@access Private

router.post(
  '/:userId',
  auth,
  check('message', 'Please enter the message').not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { message } = req.body;
    try {
      let chat = await ChatRoom.find({
        $and: [
          { userIds: { $elemMatch: { user: req.user.id } } },
          { userIds: { $elemMatch: { user: req.params.userId } } },
        ],
      });

      if (chat.length === 0) {
        chat = new ChatRoom({
          userIds: [{ user: req.user.id }, { user: req.params.userId }],
          message: [],
        });
        chat.message.push({ user: req.user.id, text: message });
        await chat.save();

        return res.json(chat);
      }

      chat[0].message.push({ user: req.user.id, text: message });
      await chat[0].save();

      res.json(chat);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
