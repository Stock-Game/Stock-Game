const newsController = {};

newsController.news = (req, res, next) => {
  console.log('---> ENTERING NEWS CONTROLLER <---');
  return next();
};

module.exports = newsController;
