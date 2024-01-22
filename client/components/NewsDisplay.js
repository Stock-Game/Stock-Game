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
  // update using get request to /news
  const axiosFetchReddit = async () => {
    await axios
      .get(`http://localhost:4000/news`)
      .then((res) => {

        // setReddit(res.data);
        console.log('reddit response', res);
      })
      .catch((err) => console.log('error: ', err));
  };

  axiosFetchReddit();

  return (
    <>
      <h1>r/WallStreetBets: Top stock ideas</h1>
      <table>
        <tbody>
          <tr>
            <th>Ticker</th>
            <th>Sentiment</th>
            <th>Number of comments</th>
            <th>Sentiment score</th>
          </tr>
          <tr>
            <td>{reddit[0].ticker}</td>
            <td>{reddit[0].sentiment}</td>
            <td>{reddit[0].no_of_comments}</td>
            <td>{reddit[0].sentiment_score}</td>
          </tr>
          <tr>
            <td>{reddit[1].ticker}</td>
            <td>{reddit[1].sentiment}</td>
            <td>{reddit[1].no_of_comments}</td>
            <td>{reddit[1].sentiment_score}</td>
          </tr>
          <tr>
            <td>{reddit[2].ticker}</td>
            <td>{reddit[2].sentiment}</td>
            <td>{reddit[2].no_of_comments}</td>
            <td>{reddit[2].sentiment_score}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
