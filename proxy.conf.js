const PROXY_CONFIG = [
  {
    context: ["/apiv1"],
    target: "http://localhost:8080",
    secure: true,
    logLeval: "debug",
    pathRewrite: { "^/apiv1": "" }
  }
];

module.exports = PROXY_CONFIG;
