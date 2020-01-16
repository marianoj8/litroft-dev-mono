// Removendo o CORS
const PROXY_CONFIG = [
  {
    context: ['/apiv1'],
    // target: 'http://localhost:8080',
    target: 'https://litroft-mono-api.herokuapp.com',
    secure: true,
    logLeval: 'debug',
    pathRewrite: { '^/apiv1': '' }
  }
];

module.exports = PROXY_CONFIG;
