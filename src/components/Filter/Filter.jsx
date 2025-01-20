import { useDispatch, useSelector } from "react-redux";
import { setFilter, resetPage } from "../../redux/filtersSlice";
import styles from "./Filter.module.css";
import { fetchCampers, resetCampers } from "../../redux/camperSlice";
import FilterOption from "../FilterOption/FilterOption";

const Filter = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  const handleChange = (key, value) => {
    dispatch(setFilter({ key, value }));
  };

  const handleSearch = () => {
    dispatch(resetCampers());
    dispatch(resetPage());
    dispatch(fetchCampers());
  };

  return (
    <div className={styles.filter}>
      <div className={styles.filters__header}>Location</div>
      <div className={styles.filterLocation}>
        <svg className={styles.icon} aria-hidden="true">
          <use href={`/sprite.svg#location-default`} />
        </svg>
        <input
          type="text"
          value={filters.location ?? ""}
          onChange={(e) => handleChange("location", e.target.value)}
        />
      </div>

      <div className={styles.filters__header}>Filters</div>

      <label>Vehicle Equipment</label>

      <svg
        className={styles.divider}
        width="360"
        height="2"
        viewBox="0 0 360 2"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 1H360" stroke="#DADDE1" />
      </svg>

      <div className={styles.filterSection}>
        <FilterOption icon="ac" name="AC" type="AC" value={true} />
        <FilterOption
          icon="automatic"
          name="Automatic"
          type="transmission"
          value="automatic"
        />
        <FilterOption
          icon="kitchen"
          name="Kitchen"
          type="kitchen"
          value={true}
        />
        <FilterOption
          icon="bathroom"
          name="Bathroom"
          type="bathroom"
          value={true}
        />
        <FilterOption icon="tv" name="TV" type="TV" value={true} />
      </div>

      <label>Vehicle Type</label>

      <svg
        className={styles.divider}
        width="360"
        height="2"
        viewBox="0 0 360 2"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 1H360" stroke="#DADDE1" />
      </svg>

      <div className={styles.filterSection}>
        <FilterOption
          icon="form-van"
          name="Panel Truck"
          type="form"
          value="panelTruck"
        />
        <FilterOption
          icon="form-fully-integrated"
          name="Fully Integrated"
          type="form"
          value="fullyIntegrated"
        />
        <FilterOption
          icon="form-alcove"
          name="Alcove"
          type="form"
          value="alcove"
        />
      </div>
      <button onClick={handleSearch} className={styles.searchButton}>
        Search
      </button>
    </div>
  );
};

export default Filter;
