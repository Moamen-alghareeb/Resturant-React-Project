import React, { useEffect, useState } from 'react';
import Navbar from './components/navbar';
import Cart from './components/Cart';
import About from './components/About';
import Home from './components/Home';
import Product from './components/Product';
import Menu from './components/Menu';
import axios from 'axios';
import { Routes, Route } from 'react-router';
import Admin from './components/Admin';
// import './index.css';

export default function App() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const pageSize = 3;
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch items and categories from server
  const fetchItems = async () => {
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

  useEffect(() => {
    fetchItems();
  }, []);

  const handleReset = () => {
    const newItems = items.map((itms) =>
      itms.isInCart ? { ...itms, count: 1 } : { ...itms }
    );
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
        itms.id === id
          ? itms.isInCart
            ? itms.count > 1
              ? itms.count - 1
              : 1 // Don't go below 1 if in cart
            : itms.count === 0
              ? 0
              : itms.count - 1
          : itms.count,
    }));
    //overwrite
    setItems(newItems);
  };

  const handleDelete = (id) => {
    // Set isInCart to false and count to 0 for the deleted item
    const newItems = items.map((itms) =>
      itms.id === id ? { ...itms, isInCart: false, count: 0 } : { ...itms }
    );
    setItems(newItems);
  };

  const handleBuy = (id) => {
    const cartItems = items.map((itm) => {
      if (itm.id === id) {
        // If adding to cart and count is 0, set count to 1
        if (!itm.isInCart && itm.count < 1) {
          return { ...itm, isInCart: true, count: 1 };
        }
        // Toggle in cart as before
        return { ...itm, isInCart: !itm.isInCart };
      }
      return itm;
    });
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
  /******************* search on all Items *******************/
  if (searchTerm) {
    filteredItems = items.filter((itm) =>
      itm.name.toLowerCase().includes(searchTerm)
    );
  }
  /*********** pagination of selected category **************/
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
              refreshItems={fetchItems}
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
        <Route
          path="/Admin"
          element={<Admin items={items} loading={loading} refreshItems={fetchItems} />}
        />
        <Route path="/About" element={<About />} />
        <Route path="/Product/:id" element={<Product />} />
      </Routes>
    </div>
  );
}
