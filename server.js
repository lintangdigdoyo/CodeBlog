const express = require('express');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: './config/.env' });
}

const app = express();

//Connect Databases
connectDB();

//Init Middleware
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.send('hello world');
});

//Define routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/user', require('./routes/api/user'));
app.use('/api/profiles', require('./routes/api/profiles'));

const PORT = process.env.PORT || '5000';
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
