import React from 'react';
import '../index.css';
import { Link, NavLink } from 'react-router';
export default function Navbar(props) {
  return (
    <div className="navbar shadow-sm rounded-2xl bg-my-hover-l">
      <div className="navbar-start">
        <NavLink to={'Menu'} className="w-fit  text-4xl ml-2">
          GH Burger
        </NavLink>
      </div>
      <div className="navbar-center flex">
        <ul className="menu menu-horizontal px-1 text-lg">
          <li className="mr-2">
            <NavLink
              className={({ isActive }) =>
                isActive ? 'font-bold  bg-my-active' : 'font-light'
              }
              to="/Home"
            >
              Home
            </NavLink>
          </li>
          <li className="mr-2">
            <NavLink
              className={({ isActive }) =>
                isActive ? 'font-bold  bg-my-active' : 'font-light'
              }
              to="/Menu"
            >
              Menu
            </NavLink>
          </li>
          <li>
            {/* navlink takes a callback function that provides a object has a funvtion called isActive and give the anchor a class named active */}
            <NavLink
              className={({ isActive }) =>
                isActive ? 'font-bold bg-my-active' : 'font-light'
              }
              to="/About"
              state={'ghareeb'}
            >
              About
            </NavLink>
          </li>
        </ul>
      </div>
      <Link to="./Cart" className="navbar-end mr-4 relative">
        <svg
          fill={props.number > 0 ? '#a9d9d0' : 'none'}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </svg>
        <span className="absolute -top-1/3 -right-2 rounded-full size-4 flex justify-center items-center text-my-hover-l bg-my-active ">
          {props.number}
        </span>
      </Link>
    </div>
  );
}
