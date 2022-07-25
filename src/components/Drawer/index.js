import React from "react";
import axios from "axios";

import Info from "../Card/Info";
import styles from "./Drawer.module.scss";

import { useCart } from "../../hooks/useCart";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ removeItem, onClose, items = [], opened }) {
  const { cartItems, setCartItems, totalPrice, vatPrice } = useCart();
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        `https://62d7af579c8b5185c779bbf9.mockapi.io/orders`,
        { items: cartItems }
      );
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      // stupid idea, only because of how mockapi works
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(
          `https://62d7af579c8b5185c779bbf9.mockapi.io/cart/` + item.id
        );
        await delay(1000);
      }
    } catch (e) {
      alert("error while putting an order :(");
    }
    setIsLoading(false);
  };

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ""}`}>
      <div className={styles.drawer}>
        <h2 className="d-flex justify-between mb-30">
          Ostoskori
          <img
            onClick={onClose}
            className="removeBtn cu-p"
            src="img/btn-remove.svg"
            alt="remove"
          />
        </h2>

        {/* if the cart items length is higher than 0, render the items div */}
        {items.length > 0 ? (
          <>
            <div className="items">
              {items.map((obj) => (
                <>
                  <div
                    key={obj.id}
                    className="cart-item d-flex align-center mb-20"
                  >
                    <div
                      style={{ backgroundImage: `url(${obj.imgUrl})` }}
                      className="cart-item-img"
                    ></div>
                    <div className="mr-20 flex">
                      <p className="mb-5">{obj.title}</p>
                      <b>{obj.price}€</b>
                    </div>
                    <img
                      className="removeBtn"
                      src="img/btn-remove.svg"
                      alt="remove"
                      onClick={() => removeItem(obj.id)}
                    />
                  </div>
                </>
              ))}
            </div>
            <div className="cart-total-block">
              <ul>
                <li className="d-flex">
                  <span>Välisumma</span>
                  <div></div>
                  <b>{totalPrice}€</b>
                </li>
                <li className="d-flex">
                  <span>VAT 24%</span>
                  <div></div>
                  <b>≈ {Math.round(vatPrice)}€</b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                onClick={onClickOrder}
                className="greenButton"
              >
                Osta <img src="img/arrow.svg" alt="arrow" />
              </button>
            </div>
          </>
        ) : (
          // else, render the empty card
          <Info
            title={isOrderComplete ? "Tilaus valmis" : "Ostoskärry on tyhjä"}
            description={
              isOrderComplete
                ? `Tilauksesi #${orderId} ohjataan pian kuriirillemme`
                : "Lisää vähintään yksi pari tennareita tehdäksesi tilauksen"
            }
            image={
              isOrderComplete
                ? "img/complete-order.jpg"
                : "img/empty-cart.jpg"
            }
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;
