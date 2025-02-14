import styles from "./TagOption.module.css";
import { capitalize } from "../../heplers/formatters";

const TagOption = ({ icon, text, iconClass = "icon" }) => {
  return (
    <div className={styles.tagOption}>
      <svg className={styles[iconClass]} aria-hidden="true">
        <use href={`/sprite.svg?ver=2#${icon}`} />
      </svg>
      <span className={styles.text}>{capitalize(text)}</span>
    </div>
  );
};

export default TagOption;
