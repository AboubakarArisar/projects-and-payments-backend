const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_LOCAL_URI + "/projects-payments-db", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true
    })
    .then((con) => {
      console.log(`Server is connected to ${con.connection.host}`);
    })
    .catch((err) => {
      console.error(`Error connecting to database: ${err.message}`);
    });
};
module.exports = connectDatabase;
