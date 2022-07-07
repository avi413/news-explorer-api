const mongoose = require('mongoose');
const Article = require('../models/article');
const { NotFoundError,UnauthorizedError, BadRequest } = require('../middlewares/errors/errors');

module.exports.getArticles = (req, res, next) => {
  const owner = req.user._id;
  if (!mongoose.Types.ObjectId.isValid(owner)) {
    throw new BadRequest('Invalid owner id');
  }
  Article.find({owner: owner})
    // return the found data to the article
    .then((article) => {
      if (!Object.keys(article).length) {
        throw new NotFoundError('No result found');
      }
      return res.send({ data: article });
    })
    // if the record was not found, display an error message
    .catch(next);
};

module.exports.saveArticle = (req, res,next) => {
  const owner = req.user._id;
  Article.create({...req.body, owner})
    .then((article) => res.status(201).send({ data: article }))
    .catch(next);
};
module.exports.deleteArticle = (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    Article.findById(req.params.id)
      .select('owner')
      .then((article) => {
        const ownerId = article.owner.toString();
        if (req.user._id === ownerId) {
          Article.findByIdAndRemove(req.params.id)
            .then((data) => res.send({ data }))
            .catch(next);
        } else {
          throw new UnauthorizedError('Can\'t delete other users article');
        }
      })
      .catch(next);
  } else {
    // bad request
    throw new BadRequest('Please provide correct id');
  }
};

module.exports.articleExist = (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    Article.findById(req.params.id)
      .then((article) => {
        // if the record was not found, display an error message
        if (!article) {
          throw new NotFoundError('Record not found');
        }
        return next();
      })
      .catch(next);
  } else {
    // bad request
    throw new BadRequest('Please provide correct id');
  }
};
