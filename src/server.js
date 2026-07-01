const app = require("./app");
const dotenv = require("dotenv");

dotenv.config({ path: "src/config/config.env" });

const connectDatabase = require("./database/connection");
//setting up config file

//connecting to db
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is port ${process.env.PORT} in ${process.env.NODE_ENV}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`Error name : ${err.name} , Error msg ${err.message}  `);
  console.log("Shutting down Server due to  Rejection Errors");
  server.close(() => {
    process.exit();
  });
});
