import { useSelector } from "react-redux";
import styles from "./CamperDetailsPage.module.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCamperById } from "../../redux/camperSlice";
import Loader from "../../components/Loader/Loader";
import {
  numberOfReviews,
  formattedPrice,
  capitalize,
} from "../../heplers/formatters";

export default function CamperDetailsPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchCamperById(id));
  }, [dispatch, id]);

  const { camper, isLoading, error } = useSelector((state) => state.campers);
  console.log(camper);

  return (
    <>
      {isLoading && <Loader />}
      {error && <p>Error loading camper!</p>}
      {camper && (
        <div className={styles.camperDetailsPage}>
          <div className={styles.header}>
            <h1 className={styles.title}>{camper.name}</h1>
            <div className={styles.subheader}>
              <span className={styles.rating}>
                <strong>
                  ⭐ {camper.rating}({numberOfReviews()} reviews)
                </strong>
              </span>
              <span className={styles.location}>{camper.location}</span>
            </div>
            <h2 className={styles.price}>{formattedPrice(camper.price)}</h2>
          </div>

          <div className={styles.gallery}>
            {camper.gallery.map((image, index) => (
              <img key={index} src={image.thumb} alt={camper.name} />
            ))}
          </div>

          <p className={styles.description}>{camper.description}</p>

          <div className={styles.featuresReviews}>
            <nav className={styles.tabMenu}>
              <button className={styles.activeTab}>Features</button>
              <button>Reviews</button>
            </nav>

            <div className={styles.features}>
              <div className={styles.equipment}>
                <span>🚗 {camper.transmission}</span>
                <span>{camper.engine}</span>
                {camper.kitchen && <span>🍳 Kitchen</span>}
                {camper.AC && <span>❄️ AC</span>}
                {camper.bathroom && <span>🚽 Bathroom</span>}
                {camper.TV && <span>📺 TV</span>}
              </div>

              <div className={styles.details}>
                <h3>Vehicle details</h3>
                <ul>
                  <li>Form: {capitalize(camper.form)}</li>
                  <li>Length: {camper.length}</li>
                  <li>Width: {camper.width}</li>
                  <li>Height: {camper.height}</li>
                  <li>Tank: {camper.tank}</li>
                  <li>Consumption: {camper.consumption}</li>
                </ul>
              </div>
            </div>

            <div>
              <h3>Reviews</h3>
              {!camper.reviews.length && <p>No reviews yet</p>}
              {camper.reviews.map((review, index) => (
                <div key={index} className={styles.review}>
                  <div className={styles.reviewHeader}>
                    <div>{review.reviewer_name.charAt(0)}</div>
                    <strong>{review.reviewer_name}</strong>
                    <span>{review.reviewer_rating}</span>
                  </div>
                  <p>{review.comment}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.bookingForm}>
            <h3>Book your campervan now</h3>
            <p>Stay connected! We are always ready to help you.</p>
            <form>
              <label>
                Name*
                <input type="text" name="name" required />
              </label>
              <label>
                Email*
                <input type="email" name="email" required />
              </label>
              <label>
                Booking date*
                <input type="date" name="bookingDate" required />
              </label>
              <label>
                Comment
                <textarea name="comment"></textarea>
              </label>
              <button type="submit" className={styles.submitButton}>
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
