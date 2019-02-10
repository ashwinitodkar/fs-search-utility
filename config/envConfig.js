const os = require("os");

module.exports = {
  environmentName: 'local',//process.env.NODE_ENV,
  appPort: 8088,//process.env.APP_PORT,
  protocol: "http://",
  subDomain: "",
  domain: "localhost",
  logs: {
    logFolder: `./logs/${os.hostname()}`
  },
  Promise: require("bluebird"),
  swaggerDefinition: {
    info: {
      title: "Avaamo Assignment",
      version: "1.0.0",
      description: "Search for a word in doc"
    },
    host: 'localhost:8088',//process.env.SWAGGER_HOST,
    basePath: "/",
    schemes: ["http", "https"]
  }
};
