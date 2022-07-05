const router = require('express').Router(); // creating a router
const { celebrate, Joi } = require('celebrate');
const { NotFoundError } = require('../middlewares/errors/errors');

const {
  getArticles,
  saveArticle,
  deleteArticle,
  articleExist,
} = require('../controllers/articles');

router.get('/', getArticles);

router.get('*', () => { throw new NotFoundError('Requested resource not found'); });

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      keyword: Joi.string().required().min(2),
      title: Joi.string().required(),
      text: Joi.string().required().min(2),
      source: Joi.string().required(),
      link: Joi.string().required(),
      image: Joi.string().required(),
    }),
  }),
  saveArticle,
);

router.post('*', () => {
  throw new NotFoundError('Requested resource not found');
});

router.delete('/:articleId ', articleExist, deleteArticle);

router.delete('*', () => {
  throw new NotFoundError('Requested resource not found');
});

module.exports = router; // exporting the router
