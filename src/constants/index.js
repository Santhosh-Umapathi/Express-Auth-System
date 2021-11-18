const { DATABASE_NAME, MONGO_USER_NAME, MONGO_PASSWORD } = process.env;

const MONGO_DB_URL = `mongodb+srv://${MONGO_USER_NAME}:${MONGO_PASSWORD}@playground-cluster.liar9.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`;

module.exports = {
  MONGO_DB_URL,
};
