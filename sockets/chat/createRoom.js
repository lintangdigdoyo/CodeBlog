const ChatRoom = require('../../models/Chat/ChatRoom');

module.exports = (io, socket) => {
  socket.on('create room', async (room) => {
    let roomChat = await ChatRoom.find({
      $and: [
        { userIds: { $elemMatch: { user: room.senderId } } },
        { userIds: { $elemMatch: { user: room.receiverId } } },
      ],
    });

    if (roomChat.length !== 0) {
      return socket.join(roomChat[0].id);
    }

    roomChat = new ChatRoom({
      userIds: [{ user: room.senderId }, { user: room.receiverId }],
      message: [],
    });

    await roomChat.save();

    const sender = await ChatRoom.find({
      userIds: { $elemMatch: { user: room.senderId } },
    }).populate('userIds.user', ['name', 'avatar']);

    const receiver = await ChatRoom.find({
      userIds: { $elemMatch: { user: room.receiverId } },
    }).populate('userIds.user', ['name', 'avatar']);

    io.to(room.senderId).emit(`chat ${room.senderId} output`, sender);
    io.to(room.receiverId).emit(`chat ${room.receiverId} output`, receiver);
  });
};
