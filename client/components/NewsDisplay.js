import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function NewsDisplay() {
  // initialize state variables
  const fakeData = [
    {
      no_of_comments: 179,
      sentiment: 'Bullish',
      sentiment_score: 0.13,
      ticker: 'GME',
    },
    {
      no_of_comments: 37,
      sentiment: 'Bullish',
      sentiment_score: 0.159,
      ticker: 'AMC',
    },
    {
      no_of_comments: 17,
      sentiment: 'Bullish',
      sentiment_score: 0.22,
      ticker: 'PLTR',
    },
  ];

  const [reddit, setReddit] = useState(fakeData);
  
  console.log

  return (
    <>
      <h1>r/WallStreetBets: Top 5 most bullish</h1>
      <table>
        <tbody>
          <tr>
            <th>Ticker</th>
            <th>Number of comments</th>
            <th>Sentiment score</th>
          </tr>
          {reddit.map((el) => {
            // map through and render
            <tr>
              <td>{el.ticker}</td>
              <td>{el.no_of_comments}</td>
              <td>{el.sentiment_score}</td>
            </tr>;
          })}
        </tbody>
      </table>
    </>
  );
}
