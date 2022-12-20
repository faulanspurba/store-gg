var express = require('express');
var router = express.Router();
const {
  index,
  actionCreate,
  viewEdit,
  actionEdit,
  actionDelete,
  actionStatus,
} = require('./controller');

const { isLoginAdmin } = require('../middleware/auth');

// router.use(isLoginAdmin)
router.get('/', index);
router.post('/create', actionCreate);
router.get('/edit/:_id', viewEdit);
router.put('/edit/:_id', actionEdit);
router.delete('/delete/:_id', actionDelete);
router.put('/status/:_id', actionStatus);

module.exports = router;
