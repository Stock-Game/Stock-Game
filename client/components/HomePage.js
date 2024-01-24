import React from 'react';
import Portfolio from './Portfolio';
import OrderTicket from './OrderTicket';
import NewsDisplay from './NewsDisplay';
import Signup from './Signup';

export default function HomePage() {
  return (
    <div>
      <div className='row2'>
        <OrderTicket />
        <Portfolio />
      </div>
      <NewsDisplay />
      <Signup />
    </div>
  );
}
