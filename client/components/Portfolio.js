import React, { useState, useEffect } from 'react';
import PortfolioTicket from './PortfolioTicket';
import BalancesDisplay from './BalancesDisplay';
// make a call to the database and grab all current positions
// use those positions to populate portfolio

// probably will loop thru all positions and render an array of PortfolioTicket components
// and pass all position info down to PortfolioTicket components thru props

export default function Portfolio() {
  // const positionKey = {
  //   ticker: 'Ticker',
  //   purchasePrice: 'Price',
  //   quantity: 'Quantity',
  //   totalVal: 'Total Value',
  //   profLoss: 'Profit/Loss',
  // };
  const testPosition = {
    ticker: 'AMC',
    purchasePrice: 5000,
    quantity: 2,
    totalVal: 10000,
    profLoss: 2000,
  };
  const testPosition2 = {
    ticker: 'TEST',
    purchasePrice: 10000,
    quantity: 3,
    totalVal: 30000,
    profLoss: 1000,
  };
  const testBalance = {
    totalVal: 100000,
    cash: 20000,
    portfolioBal: 120000,
  };

  const [positionArr, setPositionArr] = useState([testPosition, testPosition2]);

  // UNCOMMENT WHEN BACKEND HANDLES PORTFOLIO INFO
  // port might be wrong too
  // useEffect(() => {
  //   getPortfolioData();
  // }, []);

  const getPortfolioData = () => {
    fetch('http://localhost:4000/portfolio', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    // all styling will likely be moved to a css file, it's just not being served yet (i think)
    <>
      <div
        id='portfoliocontainer'
        style={{
          display: 'flex',
          flexDirection: 'column',
          border: '2px solid black',
          width: '400px',
          height: '600px',
          alignItems: 'center',
          paddingTop: '8px',
        }}
      >
        {positionArr.map((el) => (
          <PortfolioTicket ticketInfo={el} key={'key ' + el.ticker} />
        ))}
      </div>
      <BalancesDisplay balanceInfo={testBalance} />
    </>
  );
}
