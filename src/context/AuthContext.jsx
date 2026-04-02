import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();
const API_BASE_URL = 'http://localhost:5000/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    const savedUsers = localStorage.getItem('allUsers');
    
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    setIsLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const register = (userData) => {
    const newUser = {
      id: Date.now(),
      ...userData,
      createdAt: new Date().toISOString(),
    };
    
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('allUsers', JSON.stringify(updatedUsers));
    
    login(newUser);
  };

  const updateUserProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    
    const updatedUsers = users.map(u => u.id === user.id ? updatedUser : u);
    setUsers(updatedUsers);
    localStorage.setItem('allUsers', JSON.stringify(updatedUsers));
    
    login(updatedUser);
  };

  const uploadAvatar = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const avatarData = e.target.result;
          const updatedUser = { ...user, avatar: avatarData };
          
          const updatedUsers = users.map(u => u.id === user.id ? updatedUser : u);
          setUsers(updatedUsers);
          localStorage.setItem('allUsers', JSON.stringify(updatedUsers));
          
          login(updatedUser);
          resolve(updatedUser);
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Ошибка при чтении файла'));
      };
      
      reader.readAsDataURL(file);
    });
  };

  const userExists = (email) => {
    return users.some(u => u.email === email);
  };

  const value = {
    user,
    setUser,
    login,
    logout,
    register,
    users,
    isLoading,
    setIsLoading,
    updateUserProfile,
    uploadAvatar,
    userExists,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
