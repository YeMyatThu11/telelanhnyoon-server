const corsHandler = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow_Methods',
    'GET,POST,PATCH,DELETE,OPTIONS'
  );
  next();
};

module.exports = corsHandler;
