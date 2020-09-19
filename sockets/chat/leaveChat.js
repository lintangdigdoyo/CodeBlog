const ChatRoom = require('../../models/Chat/ChatRoom');

module.exports = (io, socket) => {
  socket.on('leave', async (room) => {
    const chat = await ChatRoom.find({
      $and: [
        { userIds: { $elemMatch: { user: room.senderId } } },
        { userIds: { $elemMatch: { user: room.receiverId } } },
      ],
    });
    const allChat = await ChatRoom.find({
      userIds: { $elemMatch: { user: room.senderId } },
    });

    const newRoom = chat[0].id;
    const filterRoom = allChat.filter((chat) => chat.id !== newRoom);

    filterRoom.map((room) => socket.leave(room.id));
  });
};
