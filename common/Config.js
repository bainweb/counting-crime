module.exports = (() => {
  const _ = require('lodash');

  const config = {};
  
  const envMap = { 
    'env': 'NODE_ENV',
    'port': 'NODE_PORT',
    'port_ssl': 'NODE_PORT_SSL',
    'mongo.uri': 'NODE_MONGO_URI',
  };
  
  const defaultConfig = {
    "env": "development",
    "path": {
      "static": __dirname + '/../static'
    },
    "port": 3000,
    "port_ssl": 3443,
    "mongo": {
      "uri": "mongodb://127.0.0.1:27017/countingcrime",
      "options": {
        "server": {
          "sslValidate": false
        }
      }
    },
    "smtp": {
      "host": "149.63.3.39",
      "port": "25",
      "tls": { "rejectUnauthorized": false }
    }
  };

  _.each(envMap, (envKey,configKey) => { // shell arguments most important
    if (typeof process.env[envKey] === 'undefined') return;
    _.set(config, configKey, parseBool(process.env[envKey])); // set handles dot notation for deep keys
  });

  _.defaultsDeep(config, defaultConfig); // then env-specific defaults, then all-env defaults

  return config;
})();

function parseBool(v) {
  return v === 'true' ? true : v === 'false' ? false : v;
}