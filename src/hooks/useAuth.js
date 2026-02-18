import { useAuth as useAuthContext } from '../context/AuthContext';

export const useAuth = () => {
  const auth = useAuthContext();
  
  const register = (email, password, firstName, lastName) => {
    // Провериваем если пользователь уже существует
    if (auth.userExists(email)) {
      throw new Error('Пользователь с таким email уже существует');
    }
    
    // Регистрируем нового пользователя
    auth.register({
      email,
      password,
      firstName,
      lastName,
      role: 'user',
    });
  };
  
  const loginUser = (email, password) => {
    const foundUser = auth.users.find(u => u.email === email && u.password === password);
    
    if (!foundUser) {
      throw new Error('Неверные учетные данные');
    }
    
    auth.login(foundUser);
    return foundUser;
  };
  
  return {
    ...auth,
    register,
    loginUser,
  };
};
