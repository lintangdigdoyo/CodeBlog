const ChatRoom = require('../../models/Chat/ChatRoom');

let i = 0;
module.exports = (io, socket) => {
  socket.on('join', async (room) => {
    const chat = await ChatRoom.find({
      $and: [
        { userIds: { $elemMatch: { user: room.senderId } } },
        { userIds: { $elemMatch: { user: room.receiverId } } },
      ],
    });

    if (!Object.keys(socket.rooms).includes(chat[0].id)) {
      socket.join(chat[0].id);
      const sender = await ChatRoom.find({
        userIds: { $elemMatch: { user: room.senderId } },
      }).populate('userIds.user', ['name', 'avatar']);

      io.to(chat[0].id).emit(`chat ${room.senderId} output`, sender);
    }
  });
};
