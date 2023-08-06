import React from "react";
import "./Footer.scss";
import payment from "../../database/payment.png";

function Footer({ categories }) {
  return (
    <div className="footer">
      <div className="top">
        <div className="item">
          <h1>Categories</h1>
          {categories.map((item) => (
            <span className="link" key={item.cat_id}>
              {item.category}
            </span>
          ))}
        </div>
        <div className="item">
          <h1>Links</h1>
          <span>FAQ</span>
          <span>Pages</span>
          <span>Stores</span>
          <span>Compare</span>
          <span>Cookies</span>
        </div>
        <div className="item">
          <h1>About</h1>
          <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vitae
            tortor augue. Maecenas laoreet vehicula ex, ultrices tincidunt augue
            facilisis sit amet. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit.
          </span>
        </div>
        <div className="item">
          <h1>Contact</h1>
          <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            sed mattis mi. Quisque tellus ligula, fringilla in turpis et,
            sollicitudin facilisis tortor. Quisque tristique ligula erat,
            condimentum bibendum nisl sollicitudin.
          </span>
        </div>
      </div>
      <div className="bottom">
        <div className="left">
          <span className="logo">Shippr</span>
          <span className="copyright">
            © Copyright 2023. All rights reserved
          </span>
        </div>
        <div className="right">
          <img src={payment} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Footer;
