import Card from "../components/Card";
import React from "react";

function Home({
  items,
  cartItems,
  searchValue,
  setSearchValue,
  onSearch,
  addFavorite,
  addToCart,
  isLoading,
}) {

  const renderItems = () => {
    const filteredItems = items.filter((item) =>
      item.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    );

    return (isLoading ? [...Array(10)] : filteredItems).map((item, index) => (
      <Card
        // better to make an ID key for every item and use it
        // as a key for iteration and filtering, rather than an index.
        key={index}
        onLike={addFavorite}
        onAdd={addToCart}
        isLoading={isLoading}
        {...item}
      />
    ));
  };

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>
          {searchValue ? `Hakutuloksia: "${searchValue}"` : "Kaikki lenkkarit"}
        </h1>
        <div className="search-block d-flex">
          <img src="img/search.svg" alt="search" />
          <input onChange={onSearch} value={searchValue} placeholder="Hae..." />
        </div>
      </div>
      <div className="d-flex flex-wrap">
        {/* at a certain point i though about using forEach
          but then I understood that forEach does not return anything */}
        {renderItems()}
      </div>
    </div>
  );
}

export default Home;
