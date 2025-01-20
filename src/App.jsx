import { lazy, Suspense } from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import { Routes, Route } from "react-router-dom";
import Loader from "./components/Loader/Loader";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

function App() {
  const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
  const CampersPage = lazy(() => import("./pages/CampersPage/CampersPage"));
  const CamperDetailsPage = lazy(() =>
    import("./pages/CamperDetailsPage/CamperDetailsPage")
  );

  return (
    <Suspense fallback={<Loader />}>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/campers" element={<CampersPage />} />
        <Route path="/campers/:id" element={<CamperDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
