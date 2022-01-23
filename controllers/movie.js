const colors = require('colors');
const Movie = require('../models/Movie');
const asyncHandler = require('../middleware/async');

exports.getMovies = asyncHandler(async (req, res, next) => {
  const movie = await Movie.find();
  res.status(200).json({
    success: true,
    data: movie,
  });
});

exports.getMovie = asyncHandler(async (req, res, next) => {
  const movie = await Movie.findById(req.params.id);
  res.status(200).json({
    success: true,
    data: movie,
  });
});

exports.getPopularMovies = asyncHandler(async (req, res, next) => {
  const movie = await Movie.find({ popular: true }).limit(2);
  res.status(200).json({ success: true, data: movie });
});

exports.createMovie = asyncHandler(async (req, res, next) => {
  const movie = await Movie.create(req.body).then(data => {
    res.status(200).json({ success: true, data: { msg: 'create success' } });
  });
});

exports.getMovieWithGenre = asyncHandler(async (req, res, next) => {
  const genre = req.params.genreType;
  const skip = req.params.skip ? parseInt(req.params.skip) : 0;
  const movie = await Movie.find({ genre: genre })
    .skip(skip * 0)
    .limit(12)
    .sort({ updatedAt: '-1' })
    .exec((err, docs) => {
      if (err) {
        console.log('Err on Movie Genre Route'.red, err);
      } else {
        res.status(200).json({ success: true, data: docs });
      }
    });
});

exports.getSpecificMoviesType = asyncHandler(async (req, res, next) => {
  const region = req.params.movieType;
  const skip = req.params.skip ? parseInt(req.params.skip) : 0;
  const movie = await Movie.find({ region: region })
    .skip(skip * 2)
    .limit(10)
    .sort({ updatedAt: '-1' })
    .exec((err, docs) => {
      if (err) {
        console.log('korean movie err', err);
      } else {
        res.status(200).json({ success: true, data: docs });
      }
    });
});

exports.addNewEpisode = asyncHandler(async (req, res, next) => {
  const epNo = req.body.episodeNo;
  const mdbId = req.body.mdbId;
  const epLink = req.body.episode;
  const sub = req.body.sub;
  Movie.findOne({ mdbId: mdbId }, (err, movie) => {
    if (!err) {
      let DBepisodes =
        sub === 'burmese'
          ? movie.episodes[0].burmese
          : movie.episodes[0].english;
      if (DBepisodes.length >= epNo - 1) {
        DBepisodes[epNo - 1] = epLink;
        movie.save((err, movie) => {
          if (!err) {
            res.status(200).json({
              success: true,
              data: { msg: `Succefully add episode ${req.body.episodeNo}` },
            });
          }
        });
      } else {
        res.status(400).json({
          success: false,
          data: { msg: `Can't add episode ${req.body.episodeNo}` },
        });
      }
    } else {
      res.status(400).json({
        success: false,
        data: { msg: `Can't find movie` },
      });
    }
  });
});

exports.editMovie = asyncHandler(async (req, res, next) => {
  Movie.findOne({ mdbId: req.params.id }, (err, movie) => {
    if (!err) {
      Movie.updateOne({ mdbId: req.params.id }, req.body, (err, movie) => {});
      res.status(200).json({ success: true, data: { msg: 'update success' } });
    } else {
      res.status(400).json({
        success: false,
        data: { msg: `Can't update` },
      });
    }
  });
});

exports.searchMovie = asyncHandler(async (req, res, next) => {
  const searchWord = req.params.word;
  const skip = parseInt(req.params.skip);
  console.log('search word'.underline.red, skip);
  Movie.find({
    name: { $regex: searchWord.replace(/\s+/g, ' '), $options: 'i' },
  })
    .skip(skip * 3)
    .limit(3)
    .exec((err, movie) => {
      if (!err) {
        if (movie.length > 0) {
          res
            .status(200)
            .json({ success: true, data: movie, total: movie.length });
        } else {
          res.status(200).json({ success: false, data: [], msg: 'Not Found' });
        }
      }
    });
});

exports.deleteMovie = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true, data: { msg: 'Delete success' } });
});
