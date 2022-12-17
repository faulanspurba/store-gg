const express = require('express');
const mongoose = require('mongoose');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const multer = require('multer');
const configEnv = require('./config');
const bodyParser = require('body-parser');

//   MIDDLEWARE
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());

// PUBLIC ASSETS
app.use('/public', express.static('public'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + '-' + file.originalname);
  },
});

const imageExt = ['image/jpg', 'image/jpeg', 'image/png'];

const fileFilter = (req, file, cb) => {
  if (imageExt.contains(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(multer({ storage }).single('image'));

const dashboardRouter = require('./src/dashboard/router');
const categoryRouter = require('./src/category/router');
const nominalRouter = require('./src/nominal/router');
const voucherRouter = require('./src/voucher/router');
const userRouter = require('./src/users/router');

app.use('/dashboard', dashboardRouter);
app.use('/category', categoryRouter);
app.use('/nominal', nominalRouter);
app.use('/voucher', voucherRouter);
app.use('/user', userRouter);

const API = '/API/v1';

// API
const playerRouter = require('./src/player/router');
const authRouter = require('./src/auth/router');

app.use(`${API}/players`, playerRouter);
app.use(`${API}/auth`, authRouter);

mongoose
  .connect(configEnv.MONGOOSE_URL_DB)
  .then(() => {
    const server = app.listen(configEnv.PORT, () => {
      var host = server.address().address;
      var port = server.address().port;
      console.log(`App is running on port ${configEnv.PORT}`, { host, port });
    });
  })
  .catch((err) => console.log(err));
