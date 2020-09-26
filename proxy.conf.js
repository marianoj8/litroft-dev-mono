const PROXY_CONFIG = [
  {
    context: ["/apiv1"],
    target: "http://localhost:8080",
    secure: false,
    logLeval: "debug",
    pathRewrite: { "^/apiv1": "" },
    changeOrigin: true
  }
];

module.exports = PROXY_CONFIG;
