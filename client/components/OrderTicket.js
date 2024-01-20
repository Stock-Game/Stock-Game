import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function OrderTicket() {
  // set state
  const [ticker, setTicker] = useState('');
  const [order, setOrder] = useState([]);

  const myOrder = () => {
    //

  }

  // onchange update
  const handleTickerChange = (e) => {
    setTicker(e.target.value);
  };

  const handleSubmit = (e) => {
    // get request to server with ticker in req.params
    e.preventDefault();
    axiosFetchData();
    setTicker('');
  };

  const axiosFetchData = async () => {
    console.log('fetching data...')
    await axios
      .get(`http://localhost:4000/orderTicket`, { params: { ticker: ticker.toUpperCase() } })
      .then((res) => {
        console.log('response: ', res);
      })
      .catch((err) => console.log('error: ', err)); 
  };

  return (
    <>
      <h1>Trade</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div className='formRow'>
            <textarea
              placeholder='Enter a stock ticker'
              value={ticker}
              onChange={handleTickerChange}
            />
            <button disabled={ticker.length === 0}>Submit</button>
          </div>
          <div className='formRow'>
            <p></p>
          </div>
        </form>
        {/* Stock Ticker (textarea) */}
        {/* Submit (button) - get request w/ ticker as req.param */}
        {/* Render after submit... */}
        {/* Stock Ticker (p text from above) */}
        {/* Price per share (p number from API) */}
        {/* Quantity (textarea) */}
        {/* Total Price (p number calculated by price times quantity) */}
        {/* Action (drop down) */}
        {/* Submit (button down) - post request w/ info in req.body*/}
      </div>
    </>
  );
}
