const router = require('express').Router();

const { getAllUsers, actionSignin } = require('./controller');

router.get('/', getAllUsers);
router.post('/login', actionSignin);

module.exports = router;
