import React, { useState } from "react";
import stars from "../../database/HTB1W4orR7voK1RjSZFw763iCFXal.png";
import "./PriceFilter.scss";

const PriceFilter = ({ onRatingFilterChange, onPriceRangeChange }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [selectedPriceRange, setSelectedPriceRange] = useState("");

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    onRatingFilterChange(event.target.checked ? "4" : "");
  };

  const handlePriceRangeChange = (event) => {
    const value = event.target.value;
    setSelectedPriceRange(value);
    onPriceRangeChange(value);
  };
  return (
    <div className="filters">
      <div className="recommended">
        <h2 className="title">Препоръчани продукти</h2>
        <label>
          <input
            type="checkbox"
            name="price"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <img src={stars} alt="" />
        </label>
      </div>
      <div className="priceFilter">
        <h2 className="title">Цена</h2>
        <div className="sidebarItems">
          <label className="sidebarLabel">
            <input
              type="radio"
              name="priceRange"
              value=""
              checked={selectedPriceRange === ""}
              onChange={handlePriceRangeChange}
            />
            <span className="checkmark"></span> Всички
          </label>
          <label className="sidebarLabel">
            <input
              type="radio"
              name="priceRange"
              value="0-50"
              checked={selectedPriceRange === "0-50"}
              onChange={handlePriceRangeChange}
            />
            <span className="checkmark"></span> 0 - 50лв
          </label>
          <label className="sidebarLabel">
            <input
              type="radio"
              name="priceRange"
              value="50-100"
              checked={selectedPriceRange === "50-100"}
              onChange={handlePriceRangeChange}
            />
            <span className="checkmark"></span> 50 - 100лв
          </label>
          <label className="sidebarLabel">
            <input
              type="radio"
              name="priceRange"
              value="100-200"
              checked={selectedPriceRange === "100-200"}
              onChange={handlePriceRangeChange}
            />
            <span className="checkmark"></span> 100 - 200лв
          </label>
          <label className="sidebarLabel">
            <input
              type="radio"
              name="priceRange"
              value="200-300"
              checked={selectedPriceRange === "200-300"}
              onChange={handlePriceRangeChange}
            />
            <span className="checkmark"></span> 200 - 300лв
          </label>
          <label className="sidebarLabel">
            <input
              type="radio"
              name="priceRange"
              value="300+"
              checked={selectedPriceRange === "300+"}
              onChange={handlePriceRangeChange}
            />
            <span className="checkmark"></span> Над 300лв
          </label>
        </div>
      </div>
    </div>
  );
};
export default PriceFilter;
