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

router.get('*', (req, res, next) => next());

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
      date: Joi.string().required(),
    }),
  }),
  saveArticle,
);

router.post('*', (req, res, next) => next());

router.delete('/:id', articleExist, deleteArticle);

router.delete('*', (req, res, next) => next());

router.use((req, res, next) => { next(new NotFoundError('Requested resource not found')); });
module.exports = router; // exporting the router
