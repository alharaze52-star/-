import { useAuth as useAuthContext } from '../context/AuthContext';

export const useAuth = () => {
  const auth = useAuthContext();
  
  const register = (userData) => {
    auth.login(userData);
  };
  
  const userExists = (email) => {
    return false; // Placeholder
  };
  
  return {
    ...auth,
    register,
    userExists,
  };
};
