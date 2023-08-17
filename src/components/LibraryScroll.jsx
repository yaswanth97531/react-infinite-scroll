import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import dummyPosts from './../constants/dummyPosts.json'
 
export default function LibraryScroll () {

    const [data, setData] = useState(dummyPosts)

    const fetchData = async () => {
        try {
          const API = 'https://jsonplaceholder.typicode.com/posts?';
    
          const res = await fetch(API + new URLSearchParams({
            offset: data.length
          }));
          const resData = await res.json();
    
          setData((prevState) => [...prevState, ...resData])
    
        } catch (error) {
          console.log(error);
        }
      }

    return (
        <div id="scrollableDiv" >
          <InfiniteScroll
            dataLength={data.length}
            next={fetchData}
            hasMore={true} // Replace with a condition based on your data source
            loader={<p>Loading...</p>}
            endMessage={<p>No more data to load.</p>}
          >
            <ul>
              {data.map((item, index) => (
                <li key={`${item.id}_${item.userId}_${index}`}>{`${item.userId} ${item.id} ${item.body}`}</li>
              ))}
            </ul>
          </InfiniteScroll>
        </div>
      );
}