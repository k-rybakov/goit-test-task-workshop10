import styles from "./TagOption.module.css";

const TagOption = ({ icon, text, iconClass = "icon" }) => {
  return (
    <div className={styles.tagOption}>
      <svg className={styles[iconClass]} aria-hidden="true">
        <use href={`/sprite.svg?ver=2#${icon}`} />
      </svg>
      <span className={styles.text}>{text}</span>
    </div>
  );
};

export default TagOption;
