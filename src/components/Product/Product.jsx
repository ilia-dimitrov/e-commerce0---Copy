import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { BsStarHalf, BsFillBagHeartFill } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS file for styling

import "./Product.scss";
const Product = ({ item }) => {
  // console.log(item);
  let model = item.name.split(" ").slice(0, 2).join(" ");
  let ratingStars = item.rating;
  // console.log(ratingStars);
  let rating = item.rating.toFixed(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleClickAddToCart = () => {
    setAddedToCart(true);

    // toast notification
    toast.success("Added to cart!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });

    setTimeout(() => {
      setAddedToCart(false);
    }, 1500); // Hide the alert after 1.5 seconds
  };
  const renderRatingStars = () => {
    const stars = [];
    const fullStars = Math.floor(ratingStars);

    for (let i = 0; i < fullStars; i++) {
      stars.push(<AiFillStar className="ratingStar" key={i} />);
    }

    const decimalPart = ratingStars - fullStars;

    if (decimalPart >= 0.25 && decimalPart < 0.75) {
      stars.push(<BsStarHalf className="ratingStar" key={6} />);
    } else if (decimalPart >= 0.75) {
      stars.push(<AiFillStar className="ratingStar" key={7} />);
    }

    return stars;
  };
  return (
    <section className="cardContainer">
      <section className="card">
        <img className="cardImg" src={item.image} alt="" />
        <div className="cardDetails">
          <h3 className="cardTitle">{item.brand}</h3>
          <h3 className="cardDesc">{model}</h3>
          <section className="cardStars">
            {renderRatingStars()}
            <span className="ratingTotal">{rating}/5</span>
          </section>

          <section className="cardPrice">
            <div className="price">
              {item.discount_price !== "-" ? (
                <div className="price">
                  <h4 className="lastPrice"> {item.discount_price} лв</h4>
                  <h4 className="discount">{item.price} лв</h4>
                </div>
              ) : (
                <h4 className="lastPrice"> {item.price} лв</h4>
              )}
            </div>

            <div className="bag" onClick={handleClickAddToCart}>
              <BsFillBagHeartFill
                className={`bagIcon ${addedToCart ? "added" : ""}`}
              />
            </div>
          </section>
        </div>
      </section>
    </section>
  );
};

export default Product;
