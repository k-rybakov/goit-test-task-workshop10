import styles from "./Rating.module.css";

const Rating = ({ rating }) => {
  const totalStars = 5;

  return (
    <div className={styles.rating}>
      {[...Array(totalStars)].map((_, index) => (
        <svg key={index} className={styles.icon} aria-hidden="true">
          <use
            href={`/sprite.svg#${
              index + 1 > rating ? "star-default" : "star-yellow"
            }`}
          />
        </svg>
      ))}
    </div>
  );
};

export default Rating;
