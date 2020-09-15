module.exports = (io, socket) => {
  socket.on('typing', async (data) => {
    const chat = await ChatRoom.find({
      $and: [
        { userIds: { $elemMatch: { user: data.senderId } } },
        { userIds: { $elemMatch: { user: data.receiverId } } },
      ],
    });

    // const time = () =>
    //   setTimeout(() => {
    //     socket.to(chat[0]._id).emit('typing', false);
    //   }, 1000);
    //   time();
    // clearTimeout(time());
    socket.to(chat[0]._id).emit('typing', true);
  });
};
