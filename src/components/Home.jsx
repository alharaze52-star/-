import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>EventTickets</h1>
      <p>Система регистрации и покупки билетов на мероприятия</p>
      <Link to="/register" className="home-link">
        Зарегистрироваться
      </Link>
    </div>
  );
};

export default Home;