const {
  getAllVoucher,
  dashboardVoucher,
  postDataVoucher,
} = require('./controller');

const router = require('express').Router();

router.get('/dashboard', dashboardVoucher);
router.get('/', getAllVoucher);
router.post('/', postDataVoucher);

module.exports = router;
