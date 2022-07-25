import { Link } from "react-router-dom";
import React from "react";
import { useCart } from "../../hooks/useCart";

function Header(props) {
  const { totalPrice } = useCart();

  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to="/">
        <div className="d-flex align-center ">
          <img src="/img/logo.png" alt="logo" width={40} height={40}></img>
          <div>
            <h3 className="text-uppercase">Tennarien kauppa</h3>
            <p className="opacity-5">Uudenmaan paras tennariliike</p>
          </div>
        </div>
      </Link>
      <ul className="d-flex">
        <li onClick={props.onCartClick} className="mr-30 cu-p">
          <img src="/img/cart.svg" alt="cart" width={18} height={17}></img>
          <span>{totalPrice}€</span>
        </li>
        <li>
          <Link to="/favorites">
            <img
              alt="heart"
              className="mr-20 cu-p"
              src="/img/heart.svg"
              width={18}
              height={17}
            ></img>
          </Link>
        </li>
        <li>
          <Link to="/orders">
            <img
              alt="user"
              className="mr-20 cu-p"
              src="/img/user.svg"
              width={18}
              height={17}
            ></img>
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
