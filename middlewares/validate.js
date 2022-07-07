const { celebrate, Joi } = require('celebrate');

module.exports.articlesValidate = celebrate({
    body: Joi.object().keys({
      keyword: Joi.string().required().min(2),
      title: Joi.string().required(),
      text: Joi.string().required().min(2),
      source: Joi.string().required(),
      link: Joi.string().required(),
      image: Joi.string().required(),
      date: Joi.string().required(),
    }),
  });


  module.exports.signinValidate =  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email({
        minDomainSegments: 2,
      }),
      password: Joi.string().required().min(2),
    }),
  });


  module.exports.signupValidate =  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
      }),
      password: Joi.string().required().min(2),
      name: Joi.string().required().min(2),
    }),
  });


