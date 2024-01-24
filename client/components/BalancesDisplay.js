import React, { useState, useEffect } from 'react';

export default function BalancesDisplay(props) {
  return (
    <div className='totalsBox'>
      <p>
        <strong>Total Portfolio Value:</strong> $
        {Math.floor(props.balanceInfo.totalVal).toLocaleString('en-US')}
      </p>
      <p>
        <strong>Cash: </strong>$
        {Math.floor(props.balanceInfo.cash).toLocaleString('en-US')}
      </p>
      <p>
        <strong>Total Value: </strong>$
        {Math.floor(props.balanceInfo.portfolioBal).toLocaleString('en-US')}
      </p>
    </div>
  );
}
