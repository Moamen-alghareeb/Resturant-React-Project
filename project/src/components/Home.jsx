import React, { useEffect, useState } from 'react';
import Counter from './Counter';
export default function Home() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  //1.after 1st render and with every render
  //2.after 1st render only with empty dependency array
  //3.after 1st render and with change in any value of elements of dependency array
  //4.cleanup function => before destroying the component or before the next trigger effect (ex.. changing pages) [close connection with db or anything]
  useEffect(() => {
    console.log('effect');
    //Cleanup function
    return () => {
      console.log('Cleanup!');
    };
  }, [count1]);

  console.log('render');

  const handleCount1 = () => {
    setCount1(count1 + 1);
  };
  const handleCount2 = () => {
    setCount2(count2 + 1);
  };
  return (
    <div>
      <h1>Home</h1>
      <Counter />
      {/* <button onClick={handleCount1} className="btn btn-accent mr-2">
        {count1}
      </button>
      <button onClick={handleCount2} className="btn btn-accent ">
        {count2}
      </button> */}
    </div>
  );
}
