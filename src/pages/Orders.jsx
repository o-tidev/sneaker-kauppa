import React from "react";
import Card from "../components/Card";
import axios from "axios";
import appContext from "../context";

function Orders() {
  const { addToCart, addFavorite } = React.useContext(appContext);
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `https://62d7af579c8b5185c779bbf9.mockapi.io/orders`
        );
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false);
      } catch (e) {
        alert("Error while requesting orders");
        console.error(e);
      }
    })();
  }, []);

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1> Tilaukseni </h1>
      </div>
      <div className="d-flex flex-wrap">
        {/* at a certain point i though about using forEach
          but then I understood that forEach does not return anything */}
        {(isLoading ? [Array(9)] : orders).map((item, index) => (
          <Card
            // better to make an ID key for every item and use it
            // as a key for iteration and filtering, rather than an index.
            key={index}
            onLike={addFavorite}
            onAdd={addToCart}
            isLoading={isLoading}
            {...item}
          />
        ))}
      </div>
    </div>
  );
}

export default Orders;
