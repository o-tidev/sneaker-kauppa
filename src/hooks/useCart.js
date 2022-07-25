import appContext from "../context";
import React from "react";

export const useCart = () => {
  const { cartItems, setCartItems } = React.useContext(appContext);
  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);
  const vatPrice = (totalPrice / 100) * 24;

  return { cartItems, setCartItems, totalPrice, vatPrice };
};
