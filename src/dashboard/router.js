const router = require('express').Router();
const { isLogin } = require('../middleware/auth');
const { dashboard } = require('./controller');

router.use(isLogin);
router.get('/', dashboard);

module.exports = router;
