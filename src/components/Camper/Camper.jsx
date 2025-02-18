import styles from "./Camper.module.css";
import {
  formattedPrice,
  shortDescription,
  numberOfReviews,
} from "../../heplers/formatters";
import { Link } from "react-router-dom";
import TagOption from "../TagOption/TagOption";
import { toggleFavorite } from "../../redux/camperSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const Camper = ({ camper }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.campers.favorites);
  const isFavorite = favorites.includes(camper.id);
  const [reviewsCount, setReviewsCount] = useState(() => numberOfReviews());

  const handleFavoriteClick = () => {
    dispatch(toggleFavorite(camper.id));
  };

  return (
    <div className={styles.camper}>
      <img
        src={camper.gallery[0]?.thumb}
        alt={camper.name}
        className={styles.image}
      />
      <div className={styles.details}>
        <div className={styles.title}>
          <p className={styles.title__name}>{camper.name}</p>
          <div className={styles.priceBlock}>
            <p>{formattedPrice(camper.price)}</p>
            <svg
              className={styles.iconHeart}
              onClick={handleFavoriteClick}
              aria-hidden="true"
            >
              <use
                href={`/sprite.svg#${
                  isFavorite ? "heart-red" : "heart-default"
                }`}
              />
            </svg>
          </div>
        </div>

        <div className={styles.rating}>
          <div>
            <svg className={styles.icon} aria-hidden="true">
              <use href={"/sprite.svg#star-yellow"} />
            </svg>
            {camper.rating}({reviewsCount} reviews)
          </div>
          <div>
            <svg className={styles.icon} aria-hidden="true">
              <use href={`/sprite.svg#location-default`} />
            </svg>
            {camper.location}
          </div>
        </div>

        <p className={styles.description}>
          {shortDescription(camper.description)}
        </p>

        <div className={styles.info}>
          <TagOption icon="automatic" text={camper.transmission} />
          <TagOption icon="fuel" text={camper.engine} iconClass="icon-fuel" />
          {camper.kitchen && <TagOption icon="kitchen" text="Kitchen" />}
          {camper.AC && <TagOption icon="ac" text="AC" />}
          {camper.bathroom && <TagOption icon="bathroom" text="Bathroom" />}
          {camper.TV && <TagOption icon="tv" text="TV" />}
        </div>
        <Link to={`/campers/${camper.id}`}>
          <button className={styles.moreButton}>Show more</button>
        </Link>
      </div>
    </div>
  );
};

export default Camper;
