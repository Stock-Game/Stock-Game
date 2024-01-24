const path = require('path');
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');
const app = express();
const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('DB Connected (ﾉ^ヮ^)ﾉ*:･ﾟ✧'))
  .catch((err) => console.log(err));

const newsRouter = require('./routers/newsRouter');
const orderTicketRouter = require('./routers/orderTicketRouter');
const portfolioRouter = require('./routers/portfolioRouter');
const userRouter = require('./routers/userRouter');

const PORT = process.env.PORT;

const corsOptions = {
  origin: 'http://localhost:8080',
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../client/static')));

app.use('/news', newsRouter);
app.use('/orderticket', orderTicketRouter);
app.use('/portfolio', portfolioRouter);
app.use('/logup', userRouter);

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});

app.get('/data', async (req, res) => {
  try {
    const response = await axios.get(
      'https://apewisdom.io/api/v1.0/filter/all-stocks/page/1'
    );
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
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
