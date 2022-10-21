const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
  app.use(
    createProxyMiddleware(['/api'], {
      target: "http://3.39.196.91:3001",
      changeOrigin: true
    })
  )

  app.use(
    createProxyMiddleware(['/chat'], {
      target: "http://52.79.119.226:3002",
      changeOrigin: true
    })
  )

  app.use(
    createProxyMiddleware(['/push'], {
      target: "http://43.201.89.143:3030",
      changeOrigin: true
    })
  )
}