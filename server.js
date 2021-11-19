require("dotenv").config({ path: "./config.env" });
const app = require("./index");
const mongoose = require("mongoose");

// Establishing database connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"))
  .catch(() => console.log("Error connecting DB!"));

app.listen(9000, () => console.log("server is runnning at port 9000!"));