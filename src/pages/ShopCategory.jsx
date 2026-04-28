// ShopCategory.jsx
import React, { useState, useEffect } from 'react'
import image from "../components/Assets/women.jpg"
import image1 from "../components/Assets/casual.webp"
import image2 from "../components/Assets/nightiees.webp"
import menimage1 from "../components/Assets/menscasualwear.jpg"
import menimage2 from "../components/Assets/mentraditionalwear.jpg"
import menimage3 from "../components/Assets/mensnightwear.jpg"
import kidsimage1 from "../components/Assets/kidstraditionalwear.jpg"
import kidsimage2 from "../components/Assets/kidscasualwear.jpg"
import kidsimage3 from "../components/Assets/kidsnightwear.jpg"

import { useNavigate } from "react-router-dom";

import "./css/ShopCategory.css"
import Item from '../components/item/Item'

const ShopCategory = (props) => {
  const [categories, setCategories] = useState([]);
  const toSlug = (text) =>
    text.toLowerCase().replace(/\s+/g, "-");

  const navigate = useNavigate();

  const getCategoryImage = (name) => {
    const category = name.toLowerCase().replace(/\s/g, "")
    const supercat = props.supercategory.toLowerCase()

    // WOMEN
    if (supercat === "women") {
      if (category === "partywear") return image
      if (category === "casualwear") return image1
      if (category === "nightwear") return image2
    }

    // MEN
    if (supercat === "men") {
      if (category === "partywear") return menimage2
      if (category === "casualwear") return menimage1
      if (category === "nightwear") return menimage3
    }

    // KIDS
    if (supercat === "kids") {
      if (category === "partywear") return kidsimage1
      if (category === "casualwear") return kidsimage2
      if (category === "nightwear") return kidsimage3
    }

    return image
  }

  useEffect(() => {
    fetch(`http://localhost:4000/categories-by-name/${props.supercategory}`)
      .then(res => res.json())
      .then(data => {
        console.log("CATEGORIES FROM API 👉", data);
        setCategories(data);
      });

    console.log("Supercategory:", props.supercategory);
  }, [props.supercategory]);

  const [data_product, setpopularproduct] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:4000/shopproducts/${props.supercategory}`)
      .then((response) => response.json())
      .then((data) => setpopularproduct(data));
  }, [props.supercategory])

  return (
    <div className='shop-category'>
      <img src={props.banner} alt="" className='shopcategory-banner' />
      
      <div className="subcategory-section">
        {categories.map((cat, index) => (
          <div
            key={cat._id}
            className="subcategory-card"
            onClick={() =>
              navigate(`/${props.supercategory}/${toSlug(cat.name)}`)
            }
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="subcategory-image-wrapper">
              <img
                src={getCategoryImage(cat.name)}
                className="subcategory-img"
                alt={cat.name}
              />
              <div className="subcategory-overlay">
                <span>Shop {cat.name}</span>
              </div>
            </div>
            <h3>{cat.name}</h3>
          </div>
        ))}
      </div>

      <div className="shopcategory-products">
        {data_product.map((item, i) => {
          return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        })}
      </div>
    </div>
  )
}

export default ShopCategory