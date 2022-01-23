const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });
const Movie = require('./models/Movie');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
});

const movieList = JSON.parse(
  fs.readFileSync(`${__dirname}/data.json`, 'utf-8')
);
const importData = async () => {
  try {
    await Movie.create(movieList);
    console.log('Data Imported'.green.inverse);
  } catch (err) {}
};

const deleteData = async () => {
  try {
    await Movie.deleteMany();
    console.log('Data Deleted'.green.inverse);
  } catch (err) {}
};

if (process.argv[2] === '-i') {
  importData();
} else {
  deleteData();
}
