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
  const [searchTerm, setSearchTerm] = useState('');

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
      setCategories([{ id: 0, name: 'All' }, ...categoriesData]);
      setLoading(false);
    };
    getData();
  }, []);

  const handleReset = () => {
    const newItems = items.map((itms) => ({ ...itms, count: 0 }));
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

  const handleSelectedCategory = (id) => {
    handlePagination(1);
    setSelectedCategory(id);
  };
  const handleSearch = (e) => {
    const term = e.target?.value || '';
    setSearchTerm(term.toLowerCase());
    handlePagination(1);
  };

  /*********** filteration on selected category **************/
  let filteredItems =
    selectedCategory === 0
      ? items
      : items.filter((itm) => itm.category == selectedCategory);
  // console.log(filteredItems);
  //here is the bug at this if condition
  if (searchTerm) {
    filteredItems = items.filter((itm) =>
      itm.name.toLowerCase().includes(searchTerm)
    );
  }

  const numOfPages = Math.ceil(filteredItems.length / pageSize);
  const start = (pageNum - 1) * pageSize;
  const end = start + pageSize;
  filteredItems = filteredItems.slice(start, end);

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
              pageNum={pageNum}
              numOfPages={numOfPages}
              handleBuy={handleBuy}
              handleSelectedCategory={handleSelectedCategory}
              handlePagination={handlePagination}
              handleSearch={handleSearch}
              searchTerm={searchTerm}
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
