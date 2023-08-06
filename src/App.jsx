import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import database from "./database/stuff.json";
import "./App.scss";
import Products from "./components/Products/Products";

const Layout = ({ children, categories }) => {
  return (
    <div className="layout">
      <Navbar categories={categories} />
      <div className="main-content">{children}</div>
      <Footer categories={categories} />
    </div>
  );
};

function App() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const extractedCategories = database.reduce((acc, item) => {
      if (!acc.some((category) => category.category === item.category)) {
        acc.push({
          category: item.category,
          cat_id: item.cat_id,
        });
      }
      return acc;
    }, []);

    setCategories(extractedCategories);
  }, []);

  return (
    <div className="App">
      <Router>
        <Layout categories={categories}>
          {" "}
          <Routes>
            <Route
              path="/category/:categoryId"
              element={<Products categories={categories} />}
            />
            <Route path="/" element={<Products categories={categories} />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
