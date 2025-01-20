import Filter from "../../components/Filter/Filter";
import CamperList from "../../components/CamperList/CamperList";
import { fetchCampers } from "../../redux/camperSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import css from "./CampersPage.module.css";

export default function CampersPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCampers());
  }, [dispatch]);

  return (
    <div className={css.app}>
      <aside className={css.app__filter}>
        <Filter />
      </aside>
      <main className={css.app__main}>
        <CamperList />
      </main>
    </div>
  );
}
