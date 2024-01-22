const newsController = {};

newsController.news = (req, res, next) => {
  console.log('---> ENTERING NEWS CONTROLLER <---');
  const apiUrl = 'https://tradestie.com/api/v1/apps/reddit';
  const dateParam = '2022-04-03';

  axios
    .get(apiUrl, {
      params: {
        date: dateParam,
      },
    })
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
