import React, { useState, useEffect } from 'react';

export default function BalancesDisplay(props) {
  return (
    <div>
      <p>
        Total Portfolio Value: $
        {props.balanceInfo.totalVal.toLocaleString('en-US')}
      </p>
      <p>Cash: ${props.balanceInfo.cash.toLocaleString('en-US')}</p>
      <p>
        Total Value: ${props.balanceInfo.portfolioBal.toLocaleString('en-US')}
      </p>
    </div>
  );
}
