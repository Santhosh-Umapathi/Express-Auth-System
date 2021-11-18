const mongoose = require("mongoose");
//Constants
const { MONGO_DB_URL } = require("../constants");

const connect = () =>
  mongoose
    .connect(MONGO_DB_URL)
    .then(console.log("Database Connected"))
    .catch((err) => console.log("Error connecting to Database", err));

module.exports = connect;
