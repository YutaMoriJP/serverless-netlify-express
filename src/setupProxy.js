const { createProxyMiddleware } = require("http-proxy-middleware");
const morgan = require("morgan");
//app is an instance of express()
module.exports = function (app) {
  app.use(
    "/server",
    createProxyMiddleware({
      target: "http://localhost:8888/",
      pathRewrite: {
        "^/server$": "/.netlify/functions/server",
        "^/server/express": "/.netlify/functions/express?name=yuta",
      },
      changeOrigin: true,
    })
  );
  app.use(morgan("combined"));
};
