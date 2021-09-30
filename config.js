const environments = {};

environments.development = {
  connectionString: "",
  port: 8080,
};

environments.production = {};
const currentEnv = process.env.NODE_ENV || "development";

const envToExport = environments.hasOwnProperty(currentEnv)
  ? environments[currentEnv]
  : environments.development;

module.exports = envToExport;
