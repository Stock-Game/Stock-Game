import React, { useState, useEffect } from 'react';

export default function PortfolioTicket(props) {
  return (
    //  ** the names of the props.ticketInfo properties will likely be changed **
    // all styling will likely be moved to a css file, it's just not being served yet (i think)
    <table id='portfolioticket'>
      <td>{props.ticketInfo.ticker}</td>
      <td className='purchasePrice'>
        ${props.ticketInfo.purchasePrice.toLocaleString('en-US')}
      </td>
      <td>{props.ticketInfo.quantity}</td>
      <td>${props.ticketInfo.totalVal.toLocaleString('en-US')}</td>
      <td>${props.ticketInfo.profLoss.toLocaleString('en-US')}</td>
    </table>
  );
}
