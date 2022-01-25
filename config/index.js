const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  serviceName : process.SERVICE_NAME,
  urlDB : process.MONGO_URL,
}