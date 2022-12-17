const { signUp, getDataSignUp, signIn } = require('./controller');

const router = require('express').Router();

router.get('/signup', getDataSignUp);
router.post('/signup', signUp);
router.post('/signin', signIn);

module.exports = router;
