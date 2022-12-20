var router = require('express').Router();

const {
  index,
  actionCreate,
  viewEdit,
  actionEdit,
  actionDelete,
} = require('./controller');

const { isLoginAdmin } = require('../middleware/auth');

// router.use(isLoginAdmin)
router.get('/', index);
router.post('/create', actionCreate);
router.get('/edit/:_id', viewEdit);
router.put('/edit/:_id', actionEdit);
router.delete('/delete/:id', actionDelete);

module.exports = router;
