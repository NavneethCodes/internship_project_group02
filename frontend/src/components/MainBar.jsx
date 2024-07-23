import React from 'react';
import './SideBar.css';
import { Route, Routes } from 'react-router-dom';
import SideBar from './SideBar.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import About from '../pages/About.jsx';
import Analytics from '../pages/Analytics.jsx';
import Comment from '../pages/Comment.jsx';
import Product from '../pages/Product.jsx';
import ProductList from '../pages/ProductList.jsx';

const App = () => {
  return (
      <SideBar>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/comment" element={<Comment />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/product" element={<Product />} />
          <Route path="/productList" element={<ProductList />} />
        </Routes>
      </SideBar>
  );
};

export default App;