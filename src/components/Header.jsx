import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
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
            <div className="auth-buttons">
              <Link to="/login" className="nav-link nav-link-secondary">
                Вход
              </Link>
              <Link to="/register" className="nav-link nav-link-primary">
                Регистрация
              </Link>
            </div>
          ) : (
            <div className="user-menu">
              <Link to="/profile" className="nav-link user-profile-link">
                {user.firstName}
              </Link>
              <button className="logout-btn" onClick={handleLogout}>
                Выход
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;