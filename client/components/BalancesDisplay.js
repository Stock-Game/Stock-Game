import React, { useState, useEffect } from 'react';

export default function BalancesDisplay(props) {
  return (
    <div>
      <p>
        Total Portfolio Value: $
        {Math.floor(props.balanceInfo.totalVal).toLocaleString('en-US')}
      </p>
      <p>Cash: ${Math.floor(props.balanceInfo.cash).toLocaleString('en-US')}</p>
      <p>
        Total Value: $
        {Math.floor(props.balanceInfo.portfolioBal).toLocaleString('en-US')}
      </p>
    </div>
  );
}
