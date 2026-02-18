import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  if (!user) {
    return (
      <div className="profile-container unauthorized">
        <div className="unauthorized-box">
          <h1>Доступ запрещен</h1>
          <p>Вам необходимо войти в аккаунт для доступа к профилю</p>
          <button onClick={() => navigate('/register')} className="btn-primary">
            Зарегистрироваться
          </button>
        </div>
      </div>
    );
  }

  const handleEditClick = () => {
    setIsEditing(true);
    setSuccessMessage('');
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
    });
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!editData.firstName.trim()) {
      newErrors.firstName = 'Имя обязательно';
    }

    if (!editData.lastName.trim()) {
      newErrors.lastName = 'Фамилия обязательна';
    }

    if (!editData.email.trim()) {
      newErrors.email = 'Email обязателен';
    } else if (!isValidEmail(editData.email)) {
      newErrors.email = 'Некорректный формат email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSaveChanges = () => {
    if (!validateForm()) {
      return;
    }

    updateUserProfile({
      firstName: editData.firstName,
      lastName: editData.lastName,
      email: editData.email,
    });

    setIsEditing(false);
    setSuccessMessage('Профиль успешно обновлен!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {user?.firstName?.charAt(0).toUpperCase()}
            {user?.lastName?.charAt(0).toUpperCase()}
          </div>
          <div className="profile-info-header">
            <h1 className="profile-name">{user?.firstName} {user?.lastName}</h1>
            <p className="profile-email">{user?.email}</p>
            <p className="profile-role">Тип аккаунта: <strong>{user?.role === 'admin' ? 'Администратор' : 'Обычный пользователь'}</strong></p>
          </div>
        </div>

        {successMessage && (
          <div className="success-message">
            <svg className="success-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="12" r="10" />
            </svg>
            {successMessage}
          </div>
        )}

        {!isEditing ? (
          <div className="profile-details">
            <div className="detail-group">
              <label>Имя:</label>
              <p>{user?.firstName}</p>
            </div>
            <div className="detail-group">
              <label>Фамилия:</label>
              <p>{user?.lastName}</p>
            </div>
            <div className="detail-group">
              <label>Email:</label>
              <p>{user?.email}</p>
            </div>
            <div className="detail-group">
              <label>Дата регистрации:</label>
              <p>{formatDate(user?.createdAt)}</p>
            </div>

            <div className="profile-actions">
              <button onClick={handleEditClick} className="btn btn-edit">
                Редактировать профиль
              </button>
              <button onClick={handleLogout} className="btn btn-logout">
                Выход
              </button>
            </div>
          </div>
        ) : (
          <div className="edit-form">
            <h3>Редактирование профиля</h3>

            <div className="form-group">
              <label htmlFor="firstName">Имя *</label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                value={editData.firstName}
                onChange={handleChange}
                placeholder="Введите ваше имя"
              />
              {errors.firstName && <div className="error-message">{errors.firstName}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Фамилия *</label>
              <input
                id="lastName"
                type="text"
                name="lastName"
                value={editData.lastName}
                onChange={handleChange}
                placeholder="Введите вашу фамилию"
              />
              {errors.lastName && <div className="error-message">{errors.lastName}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                id="email"
                type="email"
                name="email"
                value={editData.email}
                onChange={handleChange}
                placeholder="Введите ваш email"
              />
              {errors.email && <div className="error-message">{errors.email}</div>}
            </div>

            <div className="form-actions">
              <button onClick={handleSaveChanges} className="btn btn-save">
                Сохранить изменения
              </button>
              <button onClick={handleCancelEdit} className="btn btn-cancel">
                Отмена
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
