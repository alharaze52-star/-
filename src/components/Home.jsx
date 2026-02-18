import { Link } from 'react-router-dom';
import ComicConTickets from './ComicConTickets';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <section className="intro-section">
        <h1>Comic Con</h1>
        <p>Система регистрации и покупки билетов на мероприятия</p>
        <Link to="/register" className="home-link">
          Зарегистрироваться
        </Link>
      </section>

      <ComicConTickets />
    </div>
  );
};

export default Home;