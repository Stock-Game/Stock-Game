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

  const [balance, setBalance] = useState({
    totalVal: 0,
    cash: 200000,
    portfolioBal: 100000,
  });

  useEffect(() => {
    getPortfolioData();
  }, []);

  useEffect(() => {
    getBalanceData();
  }, [positionArr]);

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

  const getBalanceData = () => {
    let priceBought = 0;
    let totalPortVal = 0;
    positionArr.forEach((el) => {
      const thisPriceInfo = prices.find((element) => {
        return el.ticker === element.ticker;
      });
      console.log('this price info: ', thisPriceInfo);
      priceBought += el.priceBought * el.shares;
      totalPortVal += thisPriceInfo.price * el.shares;
    });
    const cash = 200000 - priceBought;
    console.log('price bought: ', priceBought);
    setBalance({
      totalVal: totalPortVal,
      cash: cash - priceBought,
      portfolioBal: cash + totalPortVal,
    });
  };

  return (
    // all styling will likely be moved to a css file, it's just not being served yet (i think)
    <>
      <div
        id='portfoliocontainer'
      >
        <button onClick={syncPrices}>SYNC</button>
        <table id='portfoliotable'>
          <thead id='titlehead'>
            <tr id='titlerow'>
              <td className='ticketkey'>Ticker</td>
              <td className='ticketkey'>Price</td>
              <td className='ticketkey' id='quantitystyle'>
                Quantity
              </td>
              <td className='ticketkey' id='valuestyle'>
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
      <BalancesDisplay balanceInfo={balance} />
    </>
  );
}
