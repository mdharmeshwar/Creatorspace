const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const { CLIENT_URL, NODE_ENV } = require('./config/env');
const healthRoutes = require('./routes/health.routes');
const postRoutes = require('./routes/post.routes');
const { notFound, errorHandler } = require('./middlewares/error.middleware');

function buildApp() {
  const app = express();

  app.set('trust proxy', 1);
  app.use(helmet());
  app.use(compression());
  app.use(
    cors({
      origin: (CLIENT_URL || '*').split(',').map((s) => s.trim()),
      credentials: true,
    }),
  );
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true }));
  if (NODE_ENV !== 'test') app.use(morgan('dev'));

  app.use('/api', healthRoutes);
  app.use('/api/posts', postRoutes);

  app.use(notFound);
  app.use(errorHandler);
  return app;
}

module.exports = buildApp;
