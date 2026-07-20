const buildApp = require('./app');
const connectDB = require('./config/db');
const { PORT, NODE_ENV } = require('./config/env');

const app = buildApp();

if (NODE_ENV !== 'test') {
  connectDB().then(() => {
    app.listen(PORT, () => console.log(`[server] :${PORT} (${NODE_ENV})`));
  });
}

module.exports = app;
