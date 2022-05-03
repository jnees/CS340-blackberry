const createProxyMiddleware = require("http-proxy-middleware");
const path = require('path');

module.exports = function(app) {
    app.use(
        'api',
        createProxyMiddleware({
            target: path.join(__dirname, process.env.PORT),
            changeOrigin: true,
        })
    );
};
