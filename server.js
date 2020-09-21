const http = require('http');
const express = require('express');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const socketio = require('socket.io');
const path = require('path');

const app = express();

app.enable('trust proxy');

if (process.env.NODE_ENV !== 'production') {
  const cors = require('cors');
  require('dotenv').config({ path: './config/.env' });
  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );
}

const server = http.createServer(app);
const io = socketio(server);

//Connect Databases
connectDB();

//Init Middleware
app.use(express.json());
app.use(cookieParser());

//Socket
io.on('connection', (socket) => {
  require('./sockets/chat/createRoom')(io, socket);
  require('./sockets/chat/sendMessage')(io, socket);
  require('./sockets/chat/getMessages')(io, socket);
  require('./sockets/chat/joinChat')(io, socket);
  require('./sockets/chat/leaveChat')(io, socket);
  require('./sockets/chat/typing')(io, socket);
});

//Public static folder
app.use('/uploads', express.static('uploads'));

//Define routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/user', require('./routes/api/user'));
app.use('/api/profiles', require('./routes/api/profiles'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/chats', require('./routes/api/chats'));

//Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || '5000';
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
