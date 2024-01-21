const portfolioController = {};
const model = require('../model/model.js');

portfolioController.buy = async (req, res, next) => {
  try {
    console.log('---> ENTERING PORTFOLIO CONTROLLER BUY <---');
    const { ticker, priceBought, dateBought, shares, totalCost } = req.body;
    const stock = await model.find({ ticker });
    if (stock.length !== 0) {
      (stock[0].shares += shares), (stock[0].totalCost += totalCost);
      (stock[0].priceBought =
        (stock[0].totalCost + totalCost) / (stock[0].shares + shares)),
        await stock[0].save();
      console.log('Sent to Mongo');
      res.locals.buy = stock[0];
      return next();
    } else {
      const newStock = await model.create({
        ticker,
        priceBought,
        dateBought,
        shares,
        totalCost,
      });
      console.log('Sent to Mongo');
      res.locals.buy = newStock;
      return next();
    }
  } catch (err) {
    return next({
      log: 'Error occurred in the portfolio buy controller',
      status: 500,
      message: { err: 'An error occurred' },
    });
  }
};

portfolioController.sell = async (req, res, next) => {
  console.log('---> ENTERING PORTFOLIO CONTROLLER SELL <---');
  const { ticker, priceSold, shares, totalCost } = req.body;
  const stock = await model.find({ ticker });
  if (shares < stock[0].shares) {
    (stock[0].shares -= shares),
      (stock[0].totalCost -= stock[0].priceBought * shares),
      await stock[0].save();
    console.log('Sent to Mongo');
    res.locals.sell = stock[0];
    return next();
  } else if (shares === stock[0].shares) {
    await model.deleteOne({ ticker });
    res.locals.sell = stock[0];
    return next();
  } else if (shares > stock[0].shares) {
    next({
      log: 'User attempted invalid sell request; not enough stocks owned.',
      status: 403,
      message: 'Error: insufficient stock ownership for sell request.',
    });
  }
};

portfolioController.read = async (req, res, next) => {
  console.log('---> ENTERING PORTFOLIO CONTROLLER READ <---');
  try {
    const stockList = await model.find();
    console.log(stockList);
    res.locals.stockList = stockList;
    return next();
  } catch (err) {
    return next({
      log: 'Error occurred in the portfolio read controller.',
      status: 500,
      message: { err: 'An error occurred.' },
    });
  }
};

module.exports = portfolioController;
