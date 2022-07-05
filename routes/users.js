const router = require('express').Router(); // creating a router
const { NotFoundError } = require('../middlewares/errors/errors');

const { getMe } = require('../controllers/users');

router.get('/me', getMe);

router.get('*', () => {
  throw new NotFoundError('Requested resource not found');
});

module.exports = router;
