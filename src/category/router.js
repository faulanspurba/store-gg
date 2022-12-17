const router = require('express').Router();
const {
  getDataCategory,
  postDataCategory,
  getIdData,
  putDataCategory,
  deleteDataCategory,
} = require('./controller');

router.get('/', getDataCategory);
router.post('/create', postDataCategory);
router.get('/edit/:_id', getIdData);
router.put('/edit/:_id', putDataCategory);
router.delete('/delete/:_id', deleteDataCategory);

module.exports = router;
