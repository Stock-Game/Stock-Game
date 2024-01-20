const portfolioController = {};

portfolioController.buy = (req, res, next) => {
  console.log('---> ENTERING PORTFOLIO CONTROLLER BUY <---');
  return next();
};

portfolioController.sell = (req, res, next) => {
  console.log('---> ENTERING PORTFOLIO CONTROLLER SELL <---');
  return next();
};

portfolioController.read = (req, res, next) => {
  console.log('---> ENTERING PORTFOLIO CONTROLLER READ <---');
  return next();
};

module.exports = portfolioController;
