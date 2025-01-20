import "./HomePage.css";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="homepage">
      <div className="homepage__content">
        <div>
          <h1 className="homepage__title">Campers of your dreams</h1>
          <p className="homepage__subtitle">
            You can find everything you want in our catalog
          </p>
        </div>

        <Link to="/campers" className="homepage__button">
          View Now
        </Link>
      </div>
    </div>
  );
}
