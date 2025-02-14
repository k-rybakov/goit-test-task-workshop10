import { useSelector } from "react-redux";
import styles from "./CamperDetailsPage.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCamperById } from "../../redux/camperSlice";
import Loader from "../../components/Loader/Loader";
import {
  numberOfReviews,
  formattedPrice,
  capitalize,
} from "../../heplers/formatters";
import TagOption from "../../components/TagOption/TagOption";
import Rating from "../../components/Rating/Rating";
import { toast, Toaster } from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CamperDetailsPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchCamperById(id));
  }, [dispatch, id]);

  const [activeTab, setActiveTab] = useState("features");

  const { camper, isLoading, error } = useSelector((state) => state.campers);

  const [selectedDate, setSelectedDate] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();
    toast.success("We got your request! We will contact you soon.");
  };

  return (
    <>
      {isLoading && <Loader />}
      {error && <p>Error loading camper!</p>}
      {camper && (
        <div className={styles.camperDetailsPage}>
          <div className={styles.header}>
            <h1 className={styles.title}>{camper.name}</h1>
            <div className={styles.subheader}>
              <div className={styles.rating}>
                <svg className={styles.icon} aria-hidden="true">
                  <use href={"/sprite.svg#star-yellow"} />
                </svg>
                {camper.rating}({numberOfReviews()} reviews)
              </div>
              <div className={styles.location}>
                <svg className={styles.iconLocation} aria-hidden="true">
                  <use href={`/sprite.svg#location-default`} />
                </svg>
                {camper.location}
              </div>
            </div>
            <h2 className={styles.price}>{formattedPrice(camper.price)}</h2>
          </div>

          <div className={styles.gallery}>
            {camper.gallery.map((image, index) => (
              <img key={index} src={image.thumb} alt={camper.name} />
            ))}
          </div>

          <p className={styles.description}>{camper.description}</p>

          <div className={styles.tabMenu}>
            <div className={styles.tabMenuButtons}>
              <button
                className={activeTab === "features" ? styles.activeTab : ""}
                onClick={() => setActiveTab("features")}
              >
                Features
              </button>
              <button
                className={activeTab === "reviews" ? styles.activeTab : ""}
                onClick={() => setActiveTab("reviews")}
              >
                Reviews
              </button>
            </div>
            <hr />
          </div>

          <div className={styles.detailedInwoWrapper}>
            <div
              className={`${styles.tabContent} ${styles.features}`}
              style={{ display: activeTab === "features" ? "flex" : "none" }}
            >
              <div className={styles.equipment}>
                <TagOption icon="automatic" text={camper.transmission} />
                <TagOption
                  icon="fuel"
                  text={camper.engine}
                  iconClass="icon-fuel"
                />
                {camper.kitchen && <TagOption icon="kitchen" text="Kitchen" />}
                {camper.AC && <TagOption icon="ac" text="AC" />}
                {camper.bathroom && (
                  <TagOption icon="bathroom" text="Bathroom" />
                )}
                {camper.TV && <TagOption icon="tv" text="TV" />}
              </div>

              <div className={styles.details}>
                <h3 className={styles.detailHeader}>Vehicle details</h3>
                <hr />
                <ul>
                  <li>
                    <span>Form</span> <span>{capitalize(camper.form)}</span>
                  </li>
                  <li>
                    <span>Length</span> <span>{camper.length}</span>
                  </li>
                  <li>
                    <span>Width</span> <span>{camper.width}</span>
                  </li>
                  <li>
                    <span>Height</span> <span>{camper.height}</span>
                  </li>
                  <li>
                    <span>Tank</span> <span>{camper.tank}</span>
                  </li>
                  <li>
                    <span>Consumption</span> <span>{camper.consumption}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div
              className={`${styles.tabContent} ${styles.reviews}`}
              style={{ display: activeTab === "reviews" ? "flex" : "none" }}
            >
              {!camper.reviews.length && <p>No reviews yet</p>}
              {camper.reviews.map((review, index) => (
                <div key={index} className={styles.review}>
                  <div className={styles.reviewHeader}>
                    <div className={styles.reviewerLogo}>
                      {review.reviewer_name.charAt(0)}
                    </div>
                    <div className={styles.reviewHeaderDetails}>
                      <span>{review.reviewer_name}</span>
                      <Rating rating={review.reviewer_rating} />
                    </div>
                  </div>
                  <p>{review.comment}</p>
                </div>
              ))}
            </div>

            <div className={styles.bookingForm}>
              <div>
                <div className={styles.bookingHeader}>
                  Book your campervan now
                </div>
                <div className={styles.bookingSubHeader}>
                  Stay connected! We are always ready to help you.
                </div>
              </div>

              <form onSubmit={submitHandler}>
                <input type="text" name="name" required placeholder="Name*" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email*"
                />
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  placeholderText="Date*"
                  dateFormat="yyyy-MM-dd"
                />
                <textarea
                  name="comment"
                  rows="5"
                  placeholder="Comment"
                ></textarea>
                <button type="submit" className={styles.submitButton}>
                  Send
                </button>
              </form>
            </div>
          </div>
          <Toaster />
        </div>
      )}
    </>
  );
}
