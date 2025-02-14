import styles from "./Camper.module.css";
import {
  formattedPrice,
  shortDescription,
  numberOfReviews,
} from "../../heplers/formatters";
import { Link } from "react-router-dom";
import TagOption from "../TagOption/TagOption";

const Camper = ({ camper }) => {
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
          <p>{formattedPrice(camper.price)}</p>
        </div>

        <div className={styles.rating}>
          <div>
            <svg className={styles.icon} aria-hidden="true">
              <use href={"/sprite.svg#star-yellow"} />
            </svg>
            {camper.rating}({numberOfReviews()} reviews)
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
