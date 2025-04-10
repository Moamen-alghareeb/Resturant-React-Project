// import { useState } from 'react';
import { BrowserRouter, Link } from 'react-router';
import '../index.css';
import Cartitem from './Cartitem2';

function Cart(props) {
  return (
    <>
      {props.items.length > 0 && (
        <div className="justify-center items-center">
          <div>
            {props.items.map((itm) => (
              <Cartitem
                key={itm.id}
                id={itm.id}
                name={itm.name}
                count={itm.count}
                handleIncreament={props.handleIncreament}
                handleDecreament={props.handleDecreament}
                handleDelete={props.handleDelete}
              />
            ))}
          </div>
          <div className="my-2">
            <button
              onClick={props.handleReset}
              className="bg-blue-600 p-2 rounded text-amber-100"
            >
              Reset
            </button>
          </div>
        </div>
      )}
      {props.items.length < 1 && (
        <div className="justify-center items-center">
          <svg
            className="mx-auto my-5 size-15"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#027373"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
            <path d="M3 6h18"></path>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>

          <h1 className="my-3">Your cart is empty</h1>

          <p className="my-2">
            Add products while you shop, so they'll be ready for checkout later.
          </p>

          <div>
            <button className="btn border-my-active hover:bg-my-active-d hover:text-white hover:border-main-d transition-all">
              <Link to="/Menu">Start shopping</Link>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
