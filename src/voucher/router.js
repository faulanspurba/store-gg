const {
  getAllVoucher,
  dashboardVoucher,
  postDataVoucher,
  updateDataVoucher,
  deleteDataVoucher,
} = require('./controller');

const router = require('express').Router();

router.get('/dashboard', dashboardVoucher);
router.get('/', getAllVoucher);
router.post('/', postDataVoucher);
router.put('/:_id', updateDataVoucher);
router.delete('/:_id', deleteDataVoucher);

module.exports = router;
