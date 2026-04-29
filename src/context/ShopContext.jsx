import React, { createContext, useEffect, useState } from "react";
// import all_product from "../components/Assets/all_product";
import API from "../config";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 1; index < 300 + 1; index++) {
    cart[index] = 0;

  }
  return cart;

}
const ShopContextProvider = (props) => {
  const [cartItem, setCartItem] = useState(getDefaultCart())


  //dta from api
  const [all_product, setall_product] = useState([])
  useEffect(() => {
    fetch(`${API}/allproducts`)
      .then((response) => response.json())
      .then((data) =>
        setall_product(data))

    if (localStorage.getItem("auth-token")) {
      fetch(`${API}/getcart`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json"
        }
      })
        .then((response) => response.json())
        .then((data) => setCartItem(data))
    }

  }, [])


  const addToCart = (itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
    if (localStorage.getItem("auth-token")) {
      fetch(`${API}/addtocart`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": `${localStorage.getItem('auth-token')}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ "itemId": itemId })
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
    }
  }
  const removeFromCart = (itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    if (localStorage.getItem("auth-token")) {
      fetch(`${API}/removefromcart`, {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem('auth-token')}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ "itemId": itemId })
      })
        .then((response) => response.json())
        .then((data) => console.log(data))

    }
  }
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        let itemInfo = all_product.find((product) => product.id === Number(item))
        totalAmount += itemInfo.new_price * cartItem[item];
      }
    }
    return totalAmount;
  }
  const getTotalCartItem = () => {
    let totalItem = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        totalItem += cartItem[item];
      }
    }
    return totalItem;
  }
  const contextValue = { getTotalCartItem, all_product, cartItem, addToCart, removeFromCart, getTotalCartAmount };


  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
