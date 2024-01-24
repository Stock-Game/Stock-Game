import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'https://tradestie.com/api/v1/apps/reddit';

const NewsDisplay = () => {
  const [reddit, setReddit] = useState([]);

  useEffect(() => {
    const fetchReddit = async () => {
      try {
        const response = await axios.get(API_URL);
        const data = response.data;
        console.log('Reddit response:', data);
        setReddit(data);
      } catch (error) {
        console.error('Fetch error:', error.message);
      }
    };

    fetchReddit();
  }, []);

  return (
    <>
      <h1>r/WallStreetBets: Top stock ideas</h1>
      <table>
        <thead>
          <tr>
            <th>No. of Comments</th>
            <th>Sentiment</th>
            <th>Sentiment Score</th>
            <th>Ticker</th>
          </tr>
        </thead>
        <tbody>
          {reddit.map((item, index) => (
            <tr key={index}>
              <td>{item.no_of_comments}</td>
              <td>{item.sentiment}</td>
              <td>{item.sentiment_score}</td>
              <td>{item.ticker}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default NewsDisplay;
