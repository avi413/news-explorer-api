const router = require('express').Router(); // creating a router
const { articlesValidate } = require('../middlewares/validate');
const auth = require('../middlewares/auth');
const {
  getArticles,
  saveArticle,
  deleteArticle,
  articleExist,
} = require('../controllers/articles');

router.get('/articles', auth, getArticles);

router.post('/articles', auth, articlesValidate, saveArticle,);

router.post('*', (req, res, next) => next());

router.delete('/articles/:id', auth, articleExist, deleteArticle);

router.delete('*', (req, res, next) => next());

module.exports = router; // exporting the router
