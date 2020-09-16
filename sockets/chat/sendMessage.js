const ChatRoom = require('../../models/Chat/ChatRoom');

module.exports = (io, socket) => {
  socket.on('chat message input', async (msg) => {
    let chat = await ChatRoom.find({
      $and: [
        { userIds: { $elemMatch: { user: msg.senderId } } },
        { userIds: { $elemMatch: { user: msg.receiverId } } },
      ],
    });

    if (chat.length === 0) {
      chat = new ChatRoom({
        userIds: [{ user: msg.senderId }, { user: msg.receiverId }],
        message: [],
      });
    }

    chat[0].message.push({ user: msg.senderId, text: msg.message });
    await chat[0].save();

    const sender = await ChatRoom.find({
      userIds: { $elemMatch: { user: msg.senderId } },
    }).populate('userIds.user', ['name', 'avatar']);

    const receiver = await ChatRoom.find({
      userIds: { $elemMatch: { user: msg.receiverId } },
    }).populate('userIds.user', ['name', 'avatar']);

    io.to(chat[0].id).emit(`chat ${msg.senderId} output`, sender);
    io.to(chat[0].id).emit(`chat ${msg.receiverId} output`, receiver);
  });
};
