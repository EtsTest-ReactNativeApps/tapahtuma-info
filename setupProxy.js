const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = function(app) {
    app.use(
      '/v1/',
      createProxyMiddleware({
        target: 'http://open-api.myhelsinki.fi',
        changeOrigin: true,
      })
    );
  };