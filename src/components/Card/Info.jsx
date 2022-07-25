import React from "react";
import appContext from "../../context";

export const Info = ({ title, image, description }) => {
  const { setCartOpened } = React.useContext(appContext);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);

  return (
    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
      <img
        className="mb-20"
        width="120px"
        src={image}
        alt="cart"
      ></img>
      <h2>{title}</h2>
      <p className="opacity-6">{description}</p>
      <button className="greenButton" onClick={() => setCartOpened(false)}>
        <img src="img/arrow.svg" alt="Arrow" /> Mene takaisin
      </button>
    </div>
  );
};

export default Info;
