import React, { useRef } from 'react';
import ToggleButton from './ToggleButton';

export default function Menu({
  items,
  handleBuy,
  loading,
  categories,
  selectedCategory,
  handleSelectedCategory,
  handlePagination,
  handleSearch,
  numOfPages,
  pageNum,
  searchTerm,
  refreshItems,
}) {
  const inputRef = useRef(null);
  let noPages = [];
  for (let i = 1; i < numOfPages + 1; i++) {
    noPages.push(i);
  }

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <span className="loading loading-ring loading-xs"></span>
        <span className="loading loading-ring loading-sm"></span>
        <span className="loading loading-ring loading-md"></span>
        <span className="loading loading-ring loading-lg"></span>
        <span className="loading loading-ring loading-xl"></span>
      </div>
    );
  }
  return (
    <>
      <div className="grid grid-cols-3 mt-10">
        {/* Categories menu */}
        <div className=" overflow-x-auto rounded-box border border-base-content/5 bg-base-100 ">
          <ul>
            {categories.map((category) => (
              <li
                onClick={() => handleSelectedCategory(category.id)}
                key={category.id}
                className={`p-6 cursor-pointer  ${
                  selectedCategory === category.id
                    ? 'bg-my-active font-bold'
                    : ' hover:bg-my-hover-l transition-all'
                }`}
              >
                {category.name}
              </li>
            ))}
          </ul>
        </div>

        {/* items menu  */}
        <div className=" col-span-2 ">
          <div className="mb-2 w-100">
            <label className="input">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input
                type="text"
                className="grow "
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search"
              />
              {searchTerm && (
                <button
                  onClick={() => {
                    handleSearch('');
                    if (inputRef.current) {
                      inputRef.current.focus(); // Optional: refocus the input
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      handleSearch('');
                      e.target.blur();
                    }
                  }}
                  className="btn btn-ghost btn-xs"
                >
                  ✕
                </button>
              )}
            </label>
          </div>
          <div className="overflow-x-auto ml-2 rounded-box border border-base-content/5 bg-base-100 w-100">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>item</th>
                  <th>price</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="text-start">
                {items.map((itm) => (
                  <tr key={itm.id}>
                    <td>{itm.name}</td>
                    <td>{itm.price}</td>
                    <td>
                      <ToggleButton
                        handler={handleBuy}
                        id={itm.id}
                        active={itm.isInCart}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* pagination */}
        {numOfPages > 1 && (
          <div className="join col-span-4 mx-auto mt-2">
            {noPages.map((elem) => (
              <button
                key={elem}
                onClick={() => handlePagination(elem)}
                className={`join-item btn  ${pageNum === elem && 'btn-active'}`}
              >
                {elem}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
