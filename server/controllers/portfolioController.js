const portfolioController = {};

portfolioController.buy = (req, res, next) => {
  console.log('---> ENTERING PORTFOLIO CONTROLLER BUY <---');
  const response = console.log('this is a buy response');
  res.locals.buy = response;
  return next();
};

portfolioController.sell = (req, res, next) => {
  console.log('---> ENTERING PORTFOLIO CONTROLLER SELL <---');
  const response = console.log('this is a sell response');
  res.locals.sell = response;
  return next();
};

portfolioController.read = (req, res, next) => {
  console.log('---> ENTERING PORTFOLIO CONTROLLER READ <---');
  const response = console.log('this is a read response');
  res.locals.read = response;
  return next();
};

module.exports = portfolioController;
