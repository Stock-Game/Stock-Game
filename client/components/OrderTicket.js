import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function OrderTicket() {
  // set state
  const [ticker, setTicker] = useState('');
  const [order, setOrder] = useState({
    ticker: '',
    price: '',
    quantity: 0,
    total: '',
    action: 'buy',
  });

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
    await axios
      .get(`http://localhost:4000/orderTicket`, {
        params: { ticker: ticker.toUpperCase() },
      })
      .then((res) => {
        setOrder({
          ...order,
          ticker: res.data.symbol,
          price: res.data.price,
        });
      })
      .catch((err) => console.log('error: ', err));
  };

  const submitOrder = async () => {
    const postData = {
      ticker: order.ticker,
      priceBought: order.price,
      shares: order.quantity,
      totalCost: order.total,
    };
    if (order.action === 'buy') {
        // buy route = post
      await axios
        .post(`http://localhost:4000/portfolio`, postData)
        .catch((err) => console.log('error: ', err));
    } else if (order.action === 'sell') {
      // sell route = delete
      await axios
        .delete(`http://localhost:4000/portfolio`, {data: postData})
        .catch((err) => console.log('error: ', err));
    }
  };

  return (
    <>
      <div>
        <div className='orderBox'>
          <form onSubmit={handleSubmit}>
            <div className='row2'>
              <textarea
                placeholder='Enter a stock ticker'
                rows='1'
                value={ticker}
                onChange={handleTickerChange}
              />
              <button disabled={ticker.length === 0}>Submit</button>
            </div>
          </form>
          <table>
            <tbody>
              <tr>
                <td>
                  <strong>Ticker</strong>
                </td>
                <td>{order.ticker}</td>
              </tr>
              <tr>
                <td>
                  <strong>Price</strong>
                </td>
                <td>{order.price}</td>
              </tr>
              <tr>
                <td>
                  <strong>Quantity</strong>
                </td>
                <td>
                  <input
                    type='number'
                    value={order.quantity || ''}
                    onChange={(e) => {
                      setOrder({
                        ...order,
                        quantity: Math.max(e.target.value, 1),
                        total: order.quantity * order.price,
                      });
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Total Transaction Amount</strong>
                </td>
                <td>{order.price * order.quantity || ''}</td>
              </tr>
              <tr>
                <td>
                  <strong>Action</strong>
                </td>
                <td>
                  {/* create a select */}
                  <select
                    value={order.action}
                    onChange={(e) => {
                      setOrder({
                        ...order,
                        action: e.target.value,
                      });
                    }}
                  >
                    <option value='buy'>Buy</option>
                    <option value='sell'>Sell</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <button
                    onClick={() => {
                      setOrder({
                        ticker: '',
                        price: '',
                        quantity: 0,
                        total: '',
                        action: '',
                      });
                      console.log(
                        `Placing a ${order.action} order for ${order.quantity} shares of ${order.ticker} at ${order.price}`
                      );
                      submitOrder();
                    }}
                    disabled={order.total === ''}
                  >
                    Submit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
