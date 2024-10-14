require("dotenv").config();
module.exports = {
  url: "mongodb://localhost:27017/node",
  // url: process.env.MONGO_URL,
};

// module.exports = {
//   url: `${process.env.MONGO_URL}/${process.env.DB_NAME}`,
// };
