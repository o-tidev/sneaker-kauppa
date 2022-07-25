import axios from "axios";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import appContext from "./context";
import Orders from "./pages/Orders";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favoriteItems, setFavoriteItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  // using useEffect so the requests sends only once, and not a thousand million times
  // everytime the app renders something
  React.useEffect(() => {
    // sending a simple request with axios
    async function fetchData() {
      try {
        const [cartRes, favoritesRes, itemsRes] = await Promise.all([
          axios.get("https://62d7af579c8b5185c779bbf9.mockapi.io/cart"),
          axios.get("https://62d7af579c8b5185c779bbf9.mockapi.io/favorites"),
          axios.get("https://62d7af579c8b5185c779bbf9.mockapi.io/items"),
        ]);

        setIsLoading(false);

        setCartItems(cartRes.data);
        setFavoriteItems(favoritesRes.data);
        setItems(itemsRes.data);
      } catch (error) {
        console.log(error.message);
        console.log("Error while requesting data ;(");
      }
    }

    fetchData();
  }, []);

  const removeItem = (id) => {
    try {
      axios.delete(`https://62d7af579c8b5185c779bbf9.mockapi.io/cart/${id}`);
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(id))
      );
    } catch (error) {
      console.log(error.message);
      alert("Error while removing item out of cart ;(");
    }
  };

  // adding to cart the desired item
  const addToCart = async (item) => {
    try {
      const findItem = cartItems.find(
        (cartItem) => Number(cartItem.parentId) === Number(item.id)
      );
      if (findItem) {
        setCartItems((prev) =>
          prev.filter(
            (cartItem) => Number(cartItem.parentId) !== Number(item.id)
          )
        );
        axios.delete(
          `https://62d7af579c8b5185c779bbf9.mockapi.io/cart/${item.id}`
        );
      } else {
        setCartItems((prev) => [...prev, item]);
        const { data } = await axios.post(
          "https://62d7af579c8b5185c779bbf9.mockapi.io/cart",
          item
        );
        setCartItems((prev) =>
          prev.map((obj) => {
            if (obj.parentId === data.parentId) {
              return {
                ...obj,
                id: data.id,
              };
            } else {
              return item;
            }
          })
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  const addFavorite = async (item) => {
    try {
      if (favoriteItems.find((FavItem) => FavItem.id === item.id)) {
        axios.delete(
          `https://62d7af579c8b5185c779bbf9.mockapi.io/favorites/${item.id}`
        );
      } else {
        const { data } = await axios.post(
          "https://62d7af579c8b5185c779bbf9.mockapi.io/favorites",
          item
        );
        setFavoriteItems((prev) => [...prev, data]);
      }
    } catch (e) {
      alert("Unable to perform this action");
      console.log(e);
    }
  };

  const onSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((item) => Number(item.parentId) === Number(id));
  };

  return (
    <appContext.Provider
      value={{
        items,
        cartItems,
        favoriteItems,
        isItemAdded,
        addFavorite,
        addToCart,
        setCartOpened,
        setCartItems,
      }}
    >
      <div className="wrapper clear">
        {/* if cartOpened is true, return drawer, else, do nothing */}
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          removeItem={removeItem}
          opened={cartOpened}
        />

        <Header onCartClick={() => setCartOpened(true)} />
        <div className="banner">
          <img src="./img/banner.png"></img>
        </div>
        <Routes>
          <Route
            path=""
            exact
            element={
              <Home
                items={items}
                cartItems={cartItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onSearch={onSearch}
                addFavorite={addFavorite}
                addToCart={addToCart}
                isLoading={isLoading}
              />
            }
          ></Route>
          <Route path="favorites" exact element={<Favorites />}></Route>
          <Route path="orders" exact element={<Orders />}></Route>
        </Routes>
      </div>
    </appContext.Provider>
  );
}

export default App;
