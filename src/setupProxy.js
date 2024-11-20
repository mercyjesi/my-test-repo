const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://chat-gpt-server-eight.vercel.app/",
      changeOrigin: true,
      secure: false,
    })
  );
};
