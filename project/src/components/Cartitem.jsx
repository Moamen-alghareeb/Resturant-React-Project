import React, { useState } from 'react';

export default function Cartitem() {
  //   let count = 0;
  let [count, setCount] = useState(0);

  let [name] = useState('Fries');
  //   console.log(count);
  //   console.log(setCount);

  const handleClick = () => {
    setCount(count + 1);
    //1.PLAN change state value
    //doesn't change the state immidiatley but after the Cartitem function is finished the setCount function is executed os in this cycle teh count remains 0 even the button is pressed but when it is invoked it rerender the Cartitem function and
    //2.force re-render to the app
    // console.log(count);
  };
  console.log(count);
  const colors = ['red', 'green', 'blue'];

  //conditional
  //   let classes = count === 0 ? 'bg-amber-300 w-3' : 'bg-green-300 w-3';
  return (
    // wrapper
    <>
      <div className="flex gap-2 p-2">
        {/* inline style takes js object in jsx formate {{}} */}
        {/* {{}} outer bracket to write js inner bracket to write js object */}
        <div style={{ color: 'red' }}>{name}</div>
        {/* js expression : function call or any expression not conditional or loops */}
        <div
          className={`w-4 text-center ${
            count === 0 ? 'bg-amber-300' : 'bg-green-300'
          }`}
        >
          {count}
        </div>
        {/* <button className={classes}>+</button> */}
        <button onClick={handleClick}>+</button>
      </div>
      {/* <ul>
        {colors.map((clr, index) => (
          <li key={index}>{clr}</li>
        ))}
      </ul> */}
    </>
  );
}
