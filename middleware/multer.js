const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, done) => done(null, './uploads/'),
  filename: (req, file, done) =>
    done(
      null,
      file.fieldname +
        Math.floor(Math.random() * 1000) +
        Date.now() +
        file.originalname
    ),
});

const upload = multer({
  storage,
  limits: {
    fileSize: 500000,
  },
});

module.exports = upload;
