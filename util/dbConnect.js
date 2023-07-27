const mongoose = require("mongoose");

const connect = mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.poa6kpu.mongodb.net/${process.env.DB_NAME}`
  )
  .then((result) => result)
  .catch((err) => console.log(err));

export default connect;
