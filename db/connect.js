
const mongoose = require('mongoose');
// async function main() {
//   await mongoose.connect(connectionString);
//   // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
// }
// main().catch(err => console.log(err));
const connectDB = (url) => {
  return mongoose.connect(url)
}

module.exports = connectDB