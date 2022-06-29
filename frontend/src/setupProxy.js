const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
  app.use(
    createProxyMiddleware(['/api'], {
      target: "http://3.39.196.91:3001",
      changeOrigin: true
    })
  )
}