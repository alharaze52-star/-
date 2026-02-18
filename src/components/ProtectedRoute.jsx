import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.2rem'
      }}>
        Загрузка...
      </div>
    );
  }

  // Если пользователь не авторизован, перенаправляем на регистрацию
  if (!user) {
    return <Navigate to="/register" replace />;
  }

  // Если нужна определенная роль, проверяем ее
  if (requiredRole && user.role !== requiredRole) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.2rem',
        color: '#dc3545'
      }}>
        У вас недостаточно прав для доступа к этой странице
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
