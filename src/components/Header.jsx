import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/Header.css';

const Header = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          Comic Con
        </Link>

        <nav className="nav">
          <Link to="/" className="nav-link">
            Главная
          </Link>
          <Link to="/about" className="nav-link">
            О нас
          </Link>
          
          {!user ? (
            <Link to="/register" className="nav-link nav-link-primary">
              Регистрация
            </Link>
          ) : (
            <button className="logout-btn" onClick={handleLogout}>
              Выход
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;