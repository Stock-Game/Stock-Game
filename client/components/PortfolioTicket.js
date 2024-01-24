import React, { useState, useEffect } from 'react';

export default function PortfolioTicket(props) {
  console.log(props.priceInfo);
  return (
    //  ** the names of the props.ticketInfo properties will likely be changed **
    // all styling will likely be moved to a css file, it's just not being served yet (i think)
    <>
      <td className='ticketcells'>{props.ticketInfo.ticker}</td>
      <td id='purchasePrice' className='ticketcells'>
        ${Math.floor(props.priceInfo.price).toLocaleString('en-US')}
      </td>
      <td className='ticketcells'>{props.ticketInfo.shares}</td>
      <td className='ticketcells'>
        $
        {Math.floor(
          props.priceInfo.price * props.ticketInfo.shares
        ).toLocaleString('en-US')}
      </td>
      <td className='ticketcells'>
        $
        {Math.floor(
          (props.priceInfo.price - props.ticketInfo.priceBought) *
            props.ticketInfo.shares
        ).toLocaleString('en-US')}
      </td>
    </>
  );
}
