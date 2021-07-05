require("dotenv").config();
const mongoose = require("mongoose");

module.exports = {
  connect: () => {
    mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    const connection = mongoose.connection;
    connection.once("open", () => {
      console.log("Database connection established successfully !");
    });
    connection.on("error", (error) => {
      console.log(`Failed to connect to database due to ${error}`);
    });
  },
};
