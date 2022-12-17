const {
  getDataNominal,
  getIdData,
  postDataNominal,
  updateDataNominal,
  deleteDataNominal,
} = require('./controller');

const router = require('express').Router();

router.get('/', getDataNominal);
router.get('/:_id', getIdData);
router.post('/', postDataNominal);
router.put('/:_id', updateDataNominal);
router.delete('/:_id', deleteDataNominal);

module.exports = router;
