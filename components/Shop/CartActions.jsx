import { useState, useContext } from "react";

import AppContext from "../../context/AppContext";

export const QuantityBtn = ({ product }) => {
  const { cart, addItem, removeItem, setCartOpen } = useContext(AppContext);

  const isInCart = (product) => {
    return !!cart.items.find((item) => item.id === product.id);
  };

  var initQuantity = 0;
  var cartProduct;

  isInCart(product)
    ? (cartProduct = cart.items.find((item) => item.id === product.id))
    : null;

  isInCart(product) ? (initQuantity = cartProduct.quantity) : null;

  const incrementHandler = () => {
    // cart.items.length < 100 ? addItem(product) : null;
    initQuantity < 100 ? addItem(product) : null;
    setCartOpen(true);
  };

  const decrementHandler = () => {
    // cart.items.length > 1 ? removeItem(product) : null;
    initQuantity > 0 ? removeItem(product) : null;
  };

  return (
    <div className="quantity-action">
      <div className="quantity-wrapper">
        <button className={`quantity-inc btn`} onClick={incrementHandler}>
          +
        </button>
        {/* {cart.items.length > 0 ? cart.items.length : 1} */}
        {initQuantity}
        <button className={`quantity-dec btn`} onClick={decrementHandler}>
          -
        </button>
      </div>
    </div>
  );
};

export const AddToCart = ({ product, className }) => {
  const { addItem, setCartOpen } = useContext(AppContext);

  return (
    <button
      className={`btn solid-btn ${className ? className : ""}`}
      onClick={() => {
        addItem(product);
        setCartOpen(true);
      }}
    >
      Add to Cart
    </button>
  );
};

export const AddWishlist = ({ product, className }) => {
  const { setWishlistOpen, addItemWishlist } = useContext(AppContext);

  return (
    <button
      className={`btn solid-btn ${className ? className : ""}`}
      onClick={() => {
        setWishlistOpen(true);
        addItemWishlist(product);
      }}
    >
      Add to Wishlist
    </button>
  );
};
