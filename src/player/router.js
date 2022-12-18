const router = require('express').Router();

const { isAuth } = require('../middleware/auth');
const {
  landingPage,
  getDetailPlayer,
  getCategory,
  checkoutAction,
  historyAction,
  historyDetail,
  dashboardAPI,
  readProfileAPI,
  editProfileAPI,
} = require('./controller');

router.get('/landingPage', landingPage);
router.get('/detail/:_id', getDetailPlayer);
router.get('/category', getCategory);
router.post('/checkout', isAuth, checkoutAction);
router.get('/history', isAuth, historyAction);
router.get('/transactionDetail/:_id', isAuth, historyDetail);
router.get('/dashboard', isAuth, dashboardAPI);
router.get('/profile', isAuth, readProfileAPI);
router.put('/profile', isAuth, editProfileAPI);

module.exports = router;
