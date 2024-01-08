const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: `${process.env.REACT_APP_MY_LOCAL_IP}:6060`,
            changeOrigin: true,
        })
    );
};