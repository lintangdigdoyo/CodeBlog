const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = (app) => {
  app.use(
    ['/api', '/uploads'],
    createProxyMiddleware({ target: 'http://localhost:5000' })
  );
};
