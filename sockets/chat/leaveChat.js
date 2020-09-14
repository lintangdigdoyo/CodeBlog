module.exports = (io, socket) => {
  socket.on('unsubscribe', function (room) {
    console.log('leaving room', room);
    socket.leave(room);
  });
};
