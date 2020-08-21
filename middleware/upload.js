const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, done) => done(null, './uploads'),
  filename: (req, file, done) =>
    done(null, file.fieldname + req.user.id + file.originalname),
});

const upload = multer({
  storage,
  limits: {
    fileSize: 500000,
  },
});

module.exports = upload;
