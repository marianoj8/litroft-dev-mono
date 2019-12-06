// Removendo o CORS
const PROXY_CONFIG = [
  {
    context: ['/api'],
    target: 'http://localhost:8080/litroft/api/v1/rm',
    secure: false,
    logLeval: 'debug',
    pathRewrite: { '^/api': '' }
  }
];

module.exports = PROXY_CONFIG;
