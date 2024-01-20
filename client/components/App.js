import React, { useState, useEffect } from 'react';
import Portfolio from './Portfolio';
import OrderTicket from './OrderTicket';

export default function App() {
  return (
    <>
      <h1>Hello world.</h1>
      <OrderTicket />
      <Portfolio />
    </>
  );
}
