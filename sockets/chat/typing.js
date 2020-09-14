module.exports = (io, socket) => {
  socket.on('typing', async (data) => {
    const chat = await ChatRoom.find({
      $and: [
        { userIds: { $elemMatch: { user: data.senderId } } },
        { userIds: { $elemMatch: { user: data.receiverId } } },
      ],
    });

    socket.to(chat[0]._id).emit('typing', true);
    // socket.to(chat[0]._id).emit('typing up', false);
  });
};
