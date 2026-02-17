import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/RegistrationForm.css';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const { register, userExists } = useAuth();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Имя обязательно';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Фамилия обязательна';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email обязателен';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Некорректный формат email';
    } else if (userExists(formData.email)) {
      newErrors.email = 'Пользователь с таким email уже зарегистрирован';
    }

    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен содержать минимум 6 символов';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate async operation
      await new Promise((resolve) => setTimeout(resolve, 500));

      register(formData.email, formData.password, formData.firstName, formData.lastName);

      setSuccessMessage('Регистрация прошла успешно! Перенаправление...');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });

      // Redirect to home after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      setErrors({ submit: 'Ошибка при регистрации. Попробуйте снова.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-card">
        <h1>Регистрация</h1>
        <p className="subtitle">Создайте аккаунт для покупки билетов на мероприятия</p>

        {successMessage && <div className="success-message">{successMessage}</div>}
        {errors.submit && <div className="error-message">{errors.submit}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">Имя *</label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Введите ваше имя"
              className={errors.firstName ? 'input-error' : ''}
            />
            {errors.firstName && <span className="error-text">{errors.firstName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Фамилия *</label>
            <input
              id="lastName"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Введите вашу фамилию"
              className={errors.lastName ? 'input-error' : ''}
            />
            {errors.lastName && <span className="error-text">{errors.lastName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Пароль *</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Минимум 6 символов"
              className={errors.password ? 'input-error' : ''}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Подтверждение пароля *</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Повторите пароль"
              className={errors.confirmPassword ? 'input-error' : ''}
            />
            {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
          </div>

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
          </button>
        </form>

        <p className="login-link">
          Уже есть аккаунт? <a href="/login">Войти</a>
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;
