import { useSelector } from "react-redux";
import Camper from "../Camper/Camper";
import styles from "./CamperList.module.css";
import Loader from "../Loader/Loader";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import { useDispatch } from "react-redux";
import { fetchCampers } from "../../redux/camperSlice";
import { setFilter } from "../../redux/filtersSlice";

const CamperList = () => {
  const dispatch = useDispatch();
  const { items, isLoading, error, hasMore } = useSelector(
    (state) => state.campers
  );
  const filters = useSelector((state) => state.filters);

  const handleLoadMore = () => {
    dispatch(setFilter({ key: "page", value: filters.page + 1 }));
    dispatch(fetchCampers());
  };

  return (
    <>
      {isLoading && <Loader />}
      {error && <p>Error loading campers!</p>}
      {items.length > 0 && (
        <div className={styles.list}>
          {items.map((camper) => (
            <Camper key={camper.id} camper={camper} />
          ))}
        </div>
      )}
      {!isLoading && hasMore && <LoadMoreBtn onLoad={handleLoadMore} />}
    </>
  );
};

export default CamperList;
