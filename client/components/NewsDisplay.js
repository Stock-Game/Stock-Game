import React, { useEffect, useState } from 'react';
import axios from 'axios';
// pull data from localhost:4000/data
const API_URL = 'http://localhost:4000/data';

const NewsDisplay = () => {
  const [reddit, setReddit] = useState([]);
  // fetch data from localhost:4000/data
  useEffect(() => {
    const fetchReddit = async () => {
      try {
        const response = await axios.get(API_URL);
        const data = response.data.results;
        console.log('Reddit response:', data);
        setReddit(data);
      } catch (error) {
        console.error('Fetch error:', error.message);
      }
    };

    fetchReddit();
  }, []);
  // Display news
  return (
    <>
      <h1>Trending Stocks on Reddit in the past 24 hours</h1>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Ticker</th>
            <th>Name</th>
            <th>Mentions</th>
            <th>Upvotes</th>
          </tr>
        </thead>
        <tbody>
          {reddit.slice(0, 3).map((item, index) => (
            <tr key={index}>
              <td>{item.rank}</td>
              <td>{item.ticker}</td>
              <td>{item.name}</td>
              <td>{item.mentions}</td>
              <td>{item.upvotes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default NewsDisplay;
