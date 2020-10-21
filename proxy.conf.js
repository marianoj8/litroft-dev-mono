// Removendo o CORS
const PROXY_CONFIG = [
  {
    context: ['/apiv1'],
    target: 'http://192.168.43.108:8080',
    secure: false,
    logLeval: 'debug',
    pathRewrite: { '^/apiv1': '' }
  }
];

module.exports = PROXY_CONFIG;
