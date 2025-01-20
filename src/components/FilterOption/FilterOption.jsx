import { useDispatch, useSelector } from "react-redux";
import styles from "./FilterOption.module.css";
import { setFilter } from "../../redux/filtersSlice";

const FilterOption = ({ icon, name, type, value }) => {
  const dispatch = useDispatch();

  const isSelected = useSelector((state) => state.filters[type] === value);

  const handleClick = () => {
    dispatch(setFilter({ key: type, value: isSelected ? null : value }));
  };

  return (
    <button
      className={`${styles.filterOption} ${isSelected ? styles.selected : ""}`}
      onClick={handleClick}
    >
      <svg className={styles.icon} aria-hidden="true">
        <use href={`/src/assets/sprite.svg#${icon}`} />
      </svg>
      <span className={styles.name}>{name}</span>
    </button>
  );
};

export default FilterOption;
