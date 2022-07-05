const mongoose = require('mongoose');
const Article = require('../models/article');
const error = require('../middlewares/errors/errors');

module.exports.getArticles = (req, res, next) => {
  Article.find({})
    // return the found data to the article
    .then((article) => {
      if (!Object.keys(article).length) {
        throw new error.NotFoundError('No result found');
      }
      return res.send({ data: article });
    })
    // if the record was not found, display an error message
    .catch(next);
};

module.exports.saveArticle = (req, res) => {
  const owner = req.user._id;
  const {
    keyword,
    title,
    text,
    source,
    link,
    image,
  } = req.body;
  Article.create({
    keyword,
    title,
    text,
    source,
    link,
    image,
    owner,
  })
    .then((article) => res.send({ data: article }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};
module.exports.deleteArticle = (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    Article.findById(req.params.id)
      .then((article) => {
        const ownerId = article.owner.toString();
        if (req.user._id === ownerId) {
          Article.findByIdAndRemove(req.params.id)
            .then((data) => res.send({ data }))
            .catch((err) => res.status(500).send({ message: err.message }));
        } else {
          throw new error.ForbiddenError('Can\'t delete other users article');
        }
      })
      .catch(next);
  } else {
    // bad request
    throw new error.BadRequest('Please provide correct id');
  }
};

module.exports.articleExist = (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    Article.findById(req.params.id)
      .then((article) => {
        // if the record was not found, display an error message
        if (!article) {
          throw new error.NotFoundError('record not found');
        }
        return next();
      })
      .catch(next);
  } else {
    // bad request
    throw new error.BadRequest('Please provide correct id');
  }
};
