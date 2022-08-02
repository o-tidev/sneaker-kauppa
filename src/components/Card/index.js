import styles from "./Card.module.scss";
import ContentLoader from "react-content-loader";
import React from "react";
import appContext from "../../context";

function Card({
  id,
  onLike,
  onAdd,
  title,
  imgUrl,
  price,
  isFavorite = false,
  wasAdded = false,
  isLoading = false,
}) {
  const { isItemAdded } = React.useContext(appContext);
  const [favorite, setFavorite] = React.useState(isFavorite);
  const obj = { id, parentId: id, title, imgUrl, price };

  const clickHandler = () => {
    onAdd(obj);
  };

  const favoriteHandler = () => {
    onLike(obj);
    setFavorite(!favorite);
  };

  return (
    <div className={styles.card}>
      {isLoading ? (
        <ContentLoader
          speed={2}
          width={150}
          height={265}
          viewBox="0 0 150 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="10" ry="10" width="150" height="155" />
          <rect x="3" y="165" rx="5" ry="5" width="150" height="15" />
          <rect x="3" y="189" rx="5" ry="5" width="100" height="15" />
          <rect x="1" y="232" rx="5" ry="5" width="80" height="24" />
          <rect x="118" y="226" rx="5" ry="5" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          <div className={styles.favorite} onClick={favoriteHandler}>
            <img
              src={
                favorite
                  ? `${process.env.PUBLIC_URL + "/img/liked.svg"}`
                  : `${process.env.PUBLIC_URL + "/img/unliked.svg"}`
              }
              alt="unliked"
            />
          </div>
          <img
            src={process.env.PUBLIC_URL + `/${imgUrl}`}
            alt="sneakers"
            width="100%"
            height={135}
          />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Hinta:</span>
              <b>{price}€</b>
            </div>
            <img
              className={styles.plus}
              onClick={() => clickHandler()}
              src={
                isItemAdded(id)
                  ? `${process.env.PUBLIC_URL + "/img/btn-checked.svg"}`
                  : `${process.env.PUBLIC_URL + "/img/btn-plus.svg"}`
              }
              alt="plus"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
