const path = require('path');
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const mongooose = require('mongoose');

mongooose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('DB Connected (ﾉ^ヮ^)ﾉ*:･ﾟ✧'))
  .catch((err) => console.log(err));

const newsRouter = require('./routers/newsRouter');
const orderTicketRouter = require('./routers/orderTicketRouter');
const portfolioRouter = require('./routers/portfolioRouter');
const userRouter = require('./routers/userRouter');

const PORT = process.env.PORT;

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.resolve(__dirname, '../client/static')));

app.use('/news', newsRouter);
app.use('/orderticket/', orderTicketRouter);
app.use('/portfolio', portfolioRouter);

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});

app.use((req, res, next) => {
  return res.status(404).send('This is not where you trade le stonks');
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error.',
    status: 500,
    message: { err: 'An error occurred.' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server online, listening on port ${PORT}.`);
});

module.exports = app;
