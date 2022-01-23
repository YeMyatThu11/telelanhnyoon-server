const mongoose = require('mongoose');
const color = require('colors');
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  });
  console.log(`MOngo db connec ${conn.connection.host}`.cyan.italic);
};
module.exports = connectDB;

// useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true,
