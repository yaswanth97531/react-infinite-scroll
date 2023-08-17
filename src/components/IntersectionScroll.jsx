import { useEffect, useRef, useState } from "react";

export default function IntersectionScroll() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [offset, setOffSet] = useState(0)

  const observerTarget = useRef(null);

  const fetchData = async () => {
    try {
      const API = "https://jsonplaceholder.typicode.com/posts?";

      const res = await fetch(
        API +
          new URLSearchParams({
            offset: offset+100,
          })
      );
      const resData = await res.json();

      setData((prevState) => [...prevState, ...resData]);
    } catch (error) {
      console.log(error);
    } finally{
        setIsLoading(false)
    }
  };

  useEffect(() => {
    setOffSet(data.length)
  }, [data])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchData(data.length);
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.disconnect()
      }
    };
  }, [observerTarget]);

  return (
    <div>
      <ul>
              {data.map((item, index) => (
                <li key={`${item.id}_${item.userId}_${index}`}>{`${item.userId} ${item.id} ${item.body}`}</li>
              ))}
            </ul>
      {isLoading && <p>Loading...</p>}
      <div ref={observerTarget}></div>
    </div>
  );
}
