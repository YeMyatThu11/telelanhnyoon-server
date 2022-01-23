const mongoose = require('mongoose');

const BootcampSchema = new mongoose.Schema(
  {
    backdop: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: [true, 'Please add a name'],
      trim: true,
      maxlength: [50, 'Name can not be more than 50 characters'],
    },
    mdbId: {
      type: Number,
      required: [true, 'Please add a mdbId'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    trailer: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: [true, 'Please add a type'],
    },
    sub: {
      type: [String],
      required: [true, 'Please add a sub'],
    },
    region: {
      type: String,
      required: [true, 'Please add a region'],
    },
    genre: {
      type: [String],
      required: true,
    },
    img: {
      type: String,
      required: [true, 'Please add a img link'],
    },
    releasedYear: {
      type: String,
      required: false,
    },
    episodes: [
      {
        burmese: {
          type: [String],
          required: false,
        },
        english: {
          type: [String],
          required: false,
        },
      },
    ],
    movieLink: {
      type: String,
      required: false,
    },
    telegram: {
      type: String,
      required: false,
    },
    tag: {
      type: [String],
      required: false,
    },
    popular: {
      type: Boolean,
      required: false,
    },
    selectedSeason: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('Movie', BootcampSchema);
