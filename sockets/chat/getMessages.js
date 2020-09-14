const ChatRoom = require('../../models/Chat/ChatRoom');

module.exports = (io, socket) => {
  socket.on('get message', async (msg) => {
    const chat = await ChatRoom.find({
      userIds: { $elemMatch: { user: msg.senderId } },
    }).populate('userIds.user', ['name', 'avatar']);

    socket.join(msg.senderId);
    io.to(msg.senderId).emit('get message', chat);
  });
};
