import React, { useEffect } from 'react';
import Navbar from './components/navbar';
import Cart from './components/Cart';
import About from './components/About';
import Home from './components/Home';
import Product from './components/Product';
import Menu from './components/Menu';
import axios from 'axios';
import { Routes, Route } from 'react-router';
import { useState } from 'react';
// import './index.css';

export default function App() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const pageSize = 3;
  // let searchingItems = [...items];
  // console.log(searchingItems);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const { data } = await axios.get(
        'http://localhost:3000/menu?_delay=1000'
      );
      const { data: categoriesData } = await axios.get(
        'http://localhost:3000/category?_delay=1000'
      );
      setItems(data);
      // setPageItems(data.slice(0, 3));
      setCategories([{ id: 0, name: 'All' }, ...categoriesData]);
      setLoading(false);
    };
    getData();
  }, []);

  const handleReset = () => {
    //clone
    //edit
    console.log(items);
    const newItems = items.map((itms) => ({ ...itms, count: 0 }));
    console.log(newItems);
    //overwrite
    setItems(newItems);
  };

  const handleIncreament = (id) => {
    //clone & edit
    const newItems = items.map((itms) => ({
      ...itms,
      count: itms.id === id ? itms.count + 1 : itms.count,
    }));
    //overwrite
    setItems(newItems);
  };

  const handleDecreament = (id) => {
    //clone & edit
    const newItems = items.map((itms) => ({
      ...itms,
      count:
        itms.id === id ? (itms.count === 0 ? 0 : itms.count - 1) : itms.count,
    }));
    //overwrite
    setItems(newItems);
  };

  const handleDelete = (id) => {
    //clone & edit
    const newItems = items.map((itms) =>
      itms.id === id ? { ...itms, isInCart: false } : { ...itms }
    );
    //overwrite
    setItems(newItems);
  };

  const handleBuy = (id) => {
    const cartItems = items.map((itm) => ({
      ...itm,
      isInCart: itm.id === id ? !itm.isInCart : itm.isInCart,
    }));
    setItems(cartItems);
  };
  const handlePagination = (PN) => setPageNum(PN);

  // const handleSearch = (e) => {
  //   numOfPages = [];
  //   searchingItems =
  //     selectedCategory != 0
  //       ? items.filter((item) => item.category === selectedCategory)
  //       : items; //make sure you are searching within the filtered items
  //   if (e.target.value === '') {
  //     setPageItems(searchingItems.slice(0, 3));
  //   } else {
  //     let newfilteredItems = searchingItems.filter((item) =>
  //       item.name.toLowerCase().includes(e.target.value.toLowerCase())
  //     );
  //     // handlePagination(1, newfilteredItems);
  //     setPageItems(newfilteredItems);
  //   }
  //   console.log(numOfPages);
  // };
  // console.log(items);

  // console.log(pageItems);
  // console.log(numOfPages);

  /*********** filteration on selected category **************/
  const handleSelectedCategory = (id) => {
    handlePagination(1);
    setSelectedCategory(id);
  };
  let filteredItems =
    selectedCategory === 0
      ? items
      : items.filter((itm) => itm.category == selectedCategory);
  // console.log(filteredItems);

  const numOfPages = Math.ceil(filteredItems.length / pageSize);

  const start = (pageNum - 1) * pageSize;
  const end = start + pageSize;
  filteredItems = filteredItems.slice(start, end);
  // console.log(num);
  // let numOfPages = [];

  return (
    <div>
      {/* shared components between all pages */}
      <Navbar number={items.reduce((sum, elem) => elem.count + sum, 0)} />
      {/* Routed components*/}
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route
          path="/Menu"
          element={
            <Menu
              items={filteredItems}
              categories={categories}
              loading={loading}
              selectedCategory={selectedCategory}
              handleBuy={handleBuy}
              handleSelectedCategory={handleSelectedCategory}
              handlePagination={handlePagination}
              pageNum={pageNum}
              numOfPages={numOfPages}
              // handleSearch={handleSearch}
            />
          }
        />
        <Route
          path="/Cart"
          element={
            <Cart
              items={items.filter((itm) => itm.isInCart)}
              handleReset={handleReset}
              handleDelete={handleDelete}
              handleDecreament={handleDecreament}
              handleIncreament={handleIncreament}
            />
          }
        />
        <Route path="/About" element={<About />} />
        <Route path="/Product/:id" element={<Product />} />
      </Routes>
    </div>
  );
}
