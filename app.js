const express = require('express');
const mongoose = require('mongoose');
const app = express();
const multer = require('multer');
const config = require('./config');
const bodyParser = require('body-parser');
const cors = require('cors');

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

app.use('/', (req, res) => {
  res.status(200).json({
    Message: `App is running on port ${config.PORT}`,
  });
});

mongoose
  .connect(config.MONGOOSE_URL_DB)
  .then(() => {
    const server = app.listen(config.PORT, () => {
      const host = server.address().address;
      const port = server.address().port;
      console.log(`App is running on port ${config.PORT}`, { host, port });
    });
  })
  .catch((err) => console.log(err));
