import { useState } from 'react';
import './ComicConTickets.css';

const ComicConTickets = () => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const ticketTypes = [
    {
      id: 1,
      name: '5 августа',
      price: 7500,
      description: 'Билет на 1-й день фестиваля',
      features: ['Вход на территорию', 'Доступ ко всем площадкам', 'Программа мероприятий']
    },
    {
      id: 2,
      name: '6 августа',
      price: 8000,
      description: 'Билет на 2-й день фестиваля',
      features: ['Вход на территорию', 'Доступ ко всем площадкам', 'VIP зона', 'Встреча с художниками']
    },
    {
      id: 3,
      name: '7 августа',
      price: 8000,
      description: 'Билет на 3-й день фестиваля',
      features: ['VIP зона', 'Встреча с авторами', 'Фотозона приоритет', 'Программа мероприятий']
    },
    {
      id: 4,
      name: '8 августа',
      price: 9000,
      description: 'Билет на 4-й день с полным доступом',
      features: ['VIP зона', 'Встреча с авторами', 'Приоритетная фотозона', 'Сумка с мерчем']
    },
    {
      id: 5,
      name: '9 августа',
      price: 9500,
      description: 'Билет на 5-й день фестиваля',
      features: ['VIP зона', 'Встреча с авторами', 'Приоритетная фотозона', 'Сумка с мерчем', 'Обед в VIP столовой']
    },
    {
      id: 6,
      name: 'Все 5 дней (5-9 августа)',
      price: 38500,
      description: 'Полный билет на весь фестиваль (все 5 дней)',
      features: ['VIP зона весь период', 'Встреча с авторами', 'Приоритетная фотозона', 'Сумка с мерчем', 'Обед в VIP столовой', 'Скидка на товары 25%', 'Доступ ко всем площадкам']
    }
  ];

  const addToCart = (ticket) => {
    setCart([...cart, { ...ticket, cartId: Date.now() }]);
  };

  const removeFromCart = (cartId) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOrder = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    if (cart.length === 0) {
      alert('Корзина пуста. Добавьте билеты');
      return;
    }

    // Имитация отправки заказа
    console.log('Заказ размещен:', {
      customer: formData,
      tickets: cart,
      total: getTotalPrice(),
      date: new Date().toLocaleDateString('ru-RU')
    });

    setOrderPlaced(true);
    setTimeout(() => {
      setCart([]);
      setFormData({ name: '', email: '', phone: '' });
      setShowCart(false);
      setOrderPlaced(false);
    }, 2000);
  };

  return (
    <div className="comic-con-container">
      <section className="comic-con-hero">
        <div className="hero-content">
          <h2>Comic Con Astana 2026</h2>
          <p>Самое крупное событие поп-культуры в Казахстане</p>
          <p className="event-date">5-9 августа 2026 | Astana Arena</p>
        </div>
      </section>

      <section className="tickets-section">
        <h3>Выберите ваш билет</h3>
        <div className="tickets-grid">
          {ticketTypes.map(ticket => (
            <div key={ticket.id} className="ticket-card">
              <div className="ticket-header">
                <h4>{ticket.name}</h4>
                <span className="price">{ticket.price.toLocaleString()} ₸</span>
              </div>
              <p className="ticket-description">{ticket.description}</p>
              <ul className="features-list">
                {ticket.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
              <button 
                onClick={() => addToCart(ticket)}
                className="add-to-cart-btn"
              >
                Добавить в корзину
              </button>
            </div>
          ))}
        </div>
      </section>

      <div className="cart-button-container">
        <button 
          className="cart-toggle-btn"
          onClick={() => setShowCart(!showCart)}
        >
          Корзина ({cart.length})
        </button>
      </div>

      {showCart && (
        <section className="cart-section">
          <h3>Ваша корзина</h3>
          
          {cart.length === 0 ? (
            <p className="empty-cart">Корзина пуста</p>
          ) : (
            <>
              <div className="cart-items">
                {cart.map(item => (
                  <div key={item.cartId} className="cart-item">
                    <div className="item-info">
                      <span className="item-name">{item.name}</span>
                      <span className="item-price">{item.price.toLocaleString()} ₸</span>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.cartId)}
                      className="remove-btn"
                    >
                      Удалить
                    </button>
                  </div>
                ))}
              </div>

              <div className="cart-total">
                <p className="total-label">Итого:</p>
                <p className="total-price">{getTotalPrice().toLocaleString()} ₸</p>
              </div>

              <form onSubmit={handleOrder} className="order-form">
                <h4>Данные покупателя</h4>
                
                <input
                  type="text"
                  name="name"
                  placeholder="Ваше полное имя"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Электронная почта"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Номер телефона"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />

                <button type="submit" className="checkout-btn">
                  Оформить заказ
                </button>
              </form>

              {orderPlaced && (
                <div className="success-message">
                  Заказ успешно размещен! Проверьте вашу электронную почту для подтверждения.
                </div>
              )}
            </>
          )}
        </section>
      )}
    </div>
  );
};

export default ComicConTickets;
