import React, { useState, useEffect } from "react";
import PriceFilter from "../PriceFilter/PriceFilter";
import "./Products.scss";
import Product from "../Product/Product";
import database from "../../database/stuff.json";
import { useParams } from "react-router-dom";

let products = database;

const Products = ({ categories }) => {
  const { categoryId } = useParams();
  const selectedCategoryId = categoryId ? parseInt(categoryId) : 1;

  const [ratingFilter, setRatingFilter] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // "asc" for A-Z, "desc" for Z-A
  const [priceSortOrder, setPriceSortOrder] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sortedData, setSortedData] = useState(products);
  const [filteredData, setFilteredData] = useState(products);
  const [recommendedChecked, setRecommendedChecked] = useState(false);
  const [priceRangeFilter, setPriceRangeFilter] = useState("");

  // Function to handle changes in the price range filter
  const handlePriceRangeChange = (value) => {
    setPriceRangeFilter(value);
  };
  // Display the selected category's name
  const selectedCategory = categories.find(
    (category) => category.cat_id == selectedCategoryId
  );

  const categoryName = selectedCategory
    ? selectedCategory.category
    : "Category Not Found";

  // State to manage the number of products to display initially
  const initialVisibleProducts = 15;

  const [visibleProducts, setVisibleProducts] = useState(
    initialVisibleProducts
  );

  const handleRatingFilterChange = (value) => {
    setRatingFilter(value);
    setVisibleProducts(15); // Reset visible products to default when the rating filter changes
  };

  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Filter the products based on the selected category and rating

  const filterAndSortData = () => {
    let filteredData = products.filter(
      (item) =>
        parseInt(item.cat_id) === selectedCategoryId &&
        (!ratingFilter || parseInt(item.rating) === parseInt(ratingFilter))
    );
    if (recommendedChecked) {
      filteredData = filteredData.filter((item) => parseInt(item.rating) >= 4);
    }
    if (priceRangeFilter === "0-50") {
      filteredData = filteredData.filter(
        (item) => parseFloat(item.price) >= 0 && parseFloat(item.price) <= 50
      );
    } else if (priceRangeFilter === "50-100") {
      filteredData = filteredData.filter(
        (item) => parseFloat(item.price) > 50 && parseFloat(item.price) <= 100
      );
    } else if (priceRangeFilter === "100-200") {
      filteredData = filteredData.filter(
        (item) => parseFloat(item.price) > 100 && parseFloat(item.price) <= 200
      );
    } else if (priceRangeFilter === "200-300") {
      filteredData = filteredData.filter(
        (item) => parseFloat(item.price) > 200 && parseFloat(item.price) <= 300
      );
    } else if (priceRangeFilter === "300+") {
      filteredData = filteredData.filter(
        (item) => parseFloat(item.price) > 300
      );
    }

    let dataToSort = [...filteredData];

    if (sortOrder === "asc") {
      dataToSort = dataToSort.sort((a, b) => {
        const aSecondWord = a.name.split(" ")[1];
        const bSecondWord = b.name.split(" ")[1];
        return aSecondWord.localeCompare(bSecondWord);
      });
    } else if (sortOrder === "desc") {
      dataToSort = dataToSort.sort((a, b) => {
        const aSecondWord = a.name.split(" ")[1];
        const bSecondWord = b.name.split(" ")[1];
        return bSecondWord.localeCompare(aSecondWord);
      });
    }

    if (priceSortOrder === "asc") {
      dataToSort = dataToSort.sort(
        (a, b) => parseFloat(a.price) - parseFloat(b.price)
      );
    } else if (priceSortOrder === "desc") {
      dataToSort = dataToSort.sort(
        (a, b) => parseFloat(b.price) - parseFloat(a.price)
      );
    }

    setFilteredData(filteredData); // Update filteredData state with the filtered data
    setSortedData(dataToSort); // Update sortedData state with the sorted data
  };
  useEffect(() => {
    filterAndSortData();
  }, [
    selectedCategoryId,
    ratingFilter,
    sortOrder,
    priceSortOrder,
    recommendedChecked,
    priceRangeFilter,
  ]);
  useEffect(() => {
    // Fetch the initial number of products whenever the category changes
    setVisibleProducts(initialVisibleProducts);
  }, [selectedCategoryId]);

  // Slice the sorted data to display only the desired number of products
  const slicedData = sortedData.slice(0, visibleProducts);

  // Function to load more products when the "Load More" button is clicked
  const handleLoadMore = () => {
    // Increase the number of visible products by 20 (5 rows of 4 each)
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 20);
  };

  const handleSortChange = (event) => {
    const selectedSortValue = event.target.value;
    if (selectedSortValue === "asc" || selectedSortValue === "desc") {
      // If A-Z or Z-A option is selected
      setSortOrder(selectedSortValue);
      setPriceSortOrder(""); // Reset price sort order
    } else if (
      selectedSortValue === "priceAsc" ||
      selectedSortValue === "priceDesc"
    ) {
      // If price sort option is selected
      setPriceSortOrder(selectedSortValue === "priceAsc" ? "asc" : "desc");
      setSortOrder(""); // Reset A-Z/Z-A sort order
    } else {
      // No Sorting option selected, reset both sorting orders
      setSortOrder("");
      setPriceSortOrder("");
    }
  };

  // Function to get the selected sort value for the sorting drop-down
  const getSelectedSortValue = () => {
    if (sortOrder === "asc") {
      return "asc";
    } else if (sortOrder === "desc") {
      return "desc";
    } else if (priceSortOrder === "asc") {
      return "priceAsc";
    } else if (priceSortOrder === "desc") {
      return "priceDesc";
    } else {
      return ""; // Default value when no sorting is selected
    }
  };

  return (
    <div className="wrapper">
      <div className={`left ${showFilters ? "show" : ""}`}>
        {/* Show the back button */}
        {showFilters && (
          <div className="back-button" onClick={handleToggleFilters}>
            <div className="arrow-wrap">
              <span className="arrow-part-1"></span>
              <span className="arrow-part-2"></span>
              <span className="arrow-part-3"></span>
            </div>
          </div>
        )}
        <div className="filterItem">
          <PriceFilter
            onRatingFilterChange={handleRatingFilterChange}
            onPriceRangeChange={handlePriceRangeChange}
          />
        </div>
      </div>
      <div className="right">
        <div className="rightAboveProducts">
          <div className="cat_name">
            <h1>
              Kатегория - {categoryName}{" "}
              <span>{filteredData.length} Продукта</span>{" "}
            </h1>
          </div>

          <div className="filters">
            <div className="nameSort">
              <div className="sort">
                <label>Подреди по:</label>
                <select
                  onChange={handleSortChange}
                  value={getSelectedSortValue()}
                >
                  <option value="">Без сортиране</option>
                  <option value="priceAsc">Цена възх.</option>
                  <option value="priceDesc">Цена низх.</option>
                  <option value="asc">Име А-Я</option>
                  <option value="desc">Име Я-А</option>
                </select>
              </div>
              <button className="invis" onClick={handleToggleFilters}>
                Филтри
              </button>
            </div>
          </div>
        </div>
        <div className="productAndButton">
          <div className="productsList">
            {slicedData.map((item) => (
              <Product item={item} key={item.uid} />
            ))}
          </div>
          {filteredData.length > visibleProducts && (
            <button className="button js-load-more" onClick={handleLoadMore}>
              Покажи още
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
