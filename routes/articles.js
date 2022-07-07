const router = require('express').Router(); // creating a router
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const {
  getArticles,
  saveArticle,
  deleteArticle,
  articleExist,
} = require('../controllers/articles');

router.get('/articles', auth, getArticles);

router.post(
  '/articles',
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

router.delete('/articles/:id', auth, articleExist, deleteArticle);

router.delete('*', (req, res, next) => next());

module.exports = router; // exporting the router
