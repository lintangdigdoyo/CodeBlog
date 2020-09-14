const ChatRoom = require('../../models/Chat/ChatRoom');

module.exports = (io, socket) => {
  socket.on('subscribe', async (room) => {
    const chat = await ChatRoom.find({
      $and: [
        { userIds: { $elemMatch: { user: room.senderId } } },
        { userIds: { $elemMatch: { user: room.receiverId } } },
      ],
    });
    socket.join(chat[0]._id);
  });
};
