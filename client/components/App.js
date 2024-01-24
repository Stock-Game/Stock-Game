import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route, BrowserRouter, Switch } from 'react-router-dom';
import Portfolio from './Portfolio';
import OrderTicket from './OrderTicket';
import NewsDisplay from './NewsDisplay';
import Signup from './Signup';
import HomePage from './HomePage';

export default function App() {
  return (
    <div className='app'>
      <span>
        <img
          height='150px'
          src='https://justkillingti.me/wp-content/2016/09/trading-places-aykroyd-murphy.png'
        />
        <h1>Trading Simulator</h1>
      </span>
      <br />
      <h1>Buy or sell a stock:</h1>

      <Routes>
        <Route exact path='/logup/signup' element={<Signup />} />
        <Route index element={<HomePage />} />
        {/* <Route exact path='/' component={HomePage} /> */}
      </Routes>
    </div>
  );

  // return (
  //   <>
  //     <div className='row'>
  //       {/* <img
  //         height={100}
  //         src={
  //           'https://factanimal.com/wp-content/uploads/2022/03/red-lipped-batfish-facts.jpg'
  //         }
  //       /> */}
  //       <h1>Trading Simulator</h1>
  //     </div>
  //     <br />
  //     <h1>Buy or sell a stock:</h1>
  //     <div className='row2'>
  //       <OrderTicket />
  //       <Portfolio />
  //     </div>
  //       <NewsDisplay />
  //   </>
  // );
}
