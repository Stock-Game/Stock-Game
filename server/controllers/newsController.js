const express = require('express');
const app = express();

// Add this middleware to enable CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

const newsController = {};

newsController.news = (req, res, next) => {
  console.log('---> ENTERING NEWS CONTROLLER <---');
  const apiUrl = 'https://apewisdom.io/api/v1.0/filter/all-stocks/page/1';
  //const dateParam = '2022-04-03';

  axios
    .get(apiUrl) //, {
    //   params: {
    //     date: dateParam,
    //   },
    //})
    .then((response) => {
      const dataSet = response.data;
      const sortedData = dataSet.sort(
        (a, b) => b.sentiment_score - a.sentiment_score
      );
      const topFive = sortedData.slice(0, 5);
      //  console.log(topFive);

      res.locals.redditInfo = topFive;

      res.status(200);
    })
    .catch((error) => {
      console.error('Error:', error.message);
    });
  return next();
};

module.exports = newsController;
