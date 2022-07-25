import React from "react";
import Card from "../components/Card";
import appContext from "../context";

function Favorites() {
  const { favoriteItems, addFavorite } = React.useContext(appContext)

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1> Omat suosikkituotteet </h1>
      </div>
      <div className="d-flex flex-wrap">
        {/* at a certain point i though about using forEach
          but then I understood that forEach does not return anything */}
        {favoriteItems.map((item, index) => (
          <Card
            // better to make an ID key for every item and use it
            // as a key for iteration and filtering, rather than an index.
            key={index}
            isFavorite={true}
            onLike={addFavorite}
            {...item}
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
