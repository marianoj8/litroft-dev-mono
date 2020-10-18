const PROXY_CONFIG = [
  {
    context: ["/apiv1"],
    target: "litroft-mono-api.herokuapp.com",
    secure: true,
    logLeval: "debug",
    pathRewrite: { "^/apiv1": "" }
  }
];

module.exports = PROXY_CONFIG;
