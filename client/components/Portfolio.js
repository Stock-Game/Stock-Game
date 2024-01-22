import React, { useState, useEffect } from 'react';
import PortfolioTicket from './PortfolioTicket';
import BalancesDisplay from './BalancesDisplay';
// make a call to the database and grab all current positions
// use those positions to populate portfolio

// probably will loop thru all positions and render an array of PortfolioTicket components
// and pass all position info down to PortfolioTicket components thru props

export default function Portfolio() {
  const testBalance = {
    totalVal: 100000,
    cash: 20000,
    portfolioBal: 120000,
  };

  const [positionArr, setPositionArr] = useState([]);

  const [prices, setPrices] = useState([]);

  useEffect(() => {
    getPortfolioData();
  }, []);

  const getPortfolioData = () => {
    fetch('http://localhost:4000/portfolio', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPositionArr(data[0]);
        setPrices(data[1]);
        console.log('');
      });
  };

  const syncPrices = () => {
    fetch('http://localhost:4000/portfolio/sync', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('DATA FROM SYNC: ', data);
        setPrices(data[0]);
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
          border: '2px solid white',
          width: '400px',
          alignItems: 'center',
          paddingTop: '8px',
        }}
      >
        <button onClick={syncPrices}>SYNC</button>
        <table id='portfoliotable'>
          <thead id='titlehead'>
            <tr id='titlerow'>
              <td className='ticketkey'>Ticker</td>
              <td className='ticketkey'>Price</td>
              <td className='ticketkey' style={{ marginRight: '8px' }}>
                Quantity
              </td>
              <td className='ticketkey' style={{ marginRight: '4px' }}>
                Total Value
              </td>
              <td className='ticketkey'>Profit/Loss</td>
            </tr>
          </thead>
          <tbody id='porttablebody'>
            {positionArr.map((el) => (
              <tr id='portfolioticket'>
                <PortfolioTicket
                  ticketInfo={el}
                  priceInfo={prices.find((element) => {
                    return element.ticker === el.ticker;
                  })}
                  key={'key ' + el.ticker}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <BalancesDisplay balanceInfo={testBalance} />
    </>
  );
}
