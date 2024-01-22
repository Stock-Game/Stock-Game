import React, { useState, useEffect } from 'react';

export default function BalancesDisplay(props) {
  return (
    <div className="totalsBox">
      <p id="totalP">
        Total Portfolio Value: $
        {props.balanceInfo.totalVal.toLocaleString('en-US')}
      </p>
      <p id="totalP">Cash: ${props.balanceInfo.cash.toLocaleString('en-US')}</p>
      <p id="totalP">
        Total Value: ${props.balanceInfo.portfolioBal.toLocaleString('en-US')}
      </p>
    </div>
  );
}
