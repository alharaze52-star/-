import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>EventTickets</h1>
      <p>Система регистрации и покупки билетов на мероприятия</p>
      <Link to="/register" style={{ 
        display: 'inline-block',
        padding: '10px 20px',
        background: '#333',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '4px',
        marginTop: '20px'
      }}>
        Зарегистрироваться
      </Link>
    </div>
  );
};

export default Home;
