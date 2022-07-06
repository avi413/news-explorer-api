const cors = require('cors');
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerDefinition = require('./swagger.json');
const { NotFoundError } = require('./middlewares/errors/errors');
const { limiter } = require('./middlewares/limiter');
const usersAouth = require('./routes/usersAouth');
const articles = require('./routes/articles');
const users = require('./routes/users');

const auth = require('./middlewares/auth');
const { requestLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

mongoose
  .connect('mongodb://0.0.0.0:27017/newsexplorerdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const app = express();

    const swaggerOptions= {
      apis: ['app.js','./routs*.js'],
      swaggerDefinition,
     };
    const swaggerDocs = swaggerJsDoc(swaggerOptions);
    app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocs))

    app.disable('etag');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(helmet());

    app.use(cors());
    app.use(limiter);
    app.use(requestLogger);

    app.use('/', usersAouth);
    /**
 * @swagger
 * /users/me:
 *   get:
 *	   security:
 *	     - BearerAuth: []
 *     description: get current user data!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
    app.use('/users', auth, users);
    app.use('/articles', auth, articles);
    app.get('*', () => {
     throw new NotFoundError('Requested resource not found');
    });

    // error handlers
    app.use(errors()); // celebrate error handler

    app.use((err, req, res, next) => {
      const { statusCode = 500, message } = err;
      res.status(statusCode).send({
        // check the status and display a message based on it
        message: statusCode === 500 && !message
          ? 'An error occurred on the server'
          : message,
      });
    });

    app.listen(PORT, () => {
      console.warn(`Server is running on PORT: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
