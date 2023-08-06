import React, { useState } from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";

const Navbar = ({ categories }) => {
  const [menuToggle, setMenuToggle] = useState(false);

  const handleToggle = () => {
    setMenuToggle(!menuToggle);
  };

  const handleLinkClick = () => {
    setMenuToggle(false);
  };

  return (
    <div className="Navbar">
      <span className="logo">Shippr</span>
      <div className={`categories ${menuToggle && "open"}`}>
        {categories.map((category, index) => {
          const categoryId = category.cat_id;
          const isFirstCategory = index === 0;

          return (
            <Link
              to={isFirstCategory ? "/" : `/category/${categoryId}`}
              key={categoryId}
              onClick={handleLinkClick}
            >
              {category.category}
            </Link>
          );
        })}
      </div>
      <div
        className={`menuToggle ${menuToggle && "open"}`}
        onClick={handleToggle}
      >
        <div className="bar"></div>
      </div>
    </div>
  );
};

export default Navbar;
