import React, { useState, useEffect } from 'react';
import { throttle } from 'lodash';

function CustomScroll() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = throttle(async () => {
    try {
      const API = 'https://jsonplaceholder.typicode.com/posts?';

      const res = await fetch(API + new URLSearchParams({
        offset: data.length
      }));
      const resData = await res.json();

      setData((prevState) => [...prevState, ...resData])

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, 2000, { trailing: false });

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [])
  
  useEffect(() => {
    if (isLoading) {
      fetchData();
    }
  }, [isLoading, fetchData])

  const handleScroll = e => {
    const el = e.target.documentElement
    const bottom = (el.scrollHeight - el.scrollTop) <= el.clientHeight + 500;
    if (bottom) {
      setIsLoading(true);
    }
  };

  return (
     <div>
      <ul onScroll={handleScroll} className="container">
      {/* <ul onScroll={(e) => console.log(e.target.scrollHeight)} className="container"> */}
        {data.map((item, index) => (
          <li key={`${item.id}_${item.userId}_${index}`}>{`${item.userId} ${item.id} ${item.body}`}</li>
        ))}
      </ul>
    </div>
  );
}

export default CustomScroll;
