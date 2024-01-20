const orderTicketController = {};
const axios = require('axios');

orderTicketController.getPrice = (req, res, next) => {
  console.log('---> ENTERING ORDER TICKET CONTROLLER GET PRICE <---');
  console.log(req.params);
  // enter API data here
  const url1 = 'https://financialmodelingprep.com/api/v3/quote/';
  const ticker = req.params;
  const url2 = '?apikey=v7vj7VtmFoqsC2wdxnvVhctwVAhs5V8H';
  const dynamicUrl = url1 + ticker + url2;
  // const staticUrl =
  // 'https://financialmodelingprep.com/api/v3/quote/META?apikey=v7vj7VtmFoqsC2wdxnvVhctwVAhs5V8H';
  axios
    .get(dynamicUrl)
    .then((response) => {
      const data = response.data;
      // console.log(“respose:“, response);
      console.log('respose.data: ', response.data);
      const resultData = {
        symbol: data[0].symbol,
        price: data[0].price,
      };
      res.status(200).json(resultData);
      return next();
    })
    .catch((err) => {
      return next({
        log: 'Error caught in Order Ticket Get Price Middleware',
        status: 500,
        message: { err: 'Internal Server Error' },
      });
    });
};

module.exports = orderTicketController;
