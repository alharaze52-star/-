import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>О компании</h4>
            <p>
              EventTickets - платформа для поиска и покупки билетов на
              различные мероприятия по всему миру.
            </p>
          </div>
          <div className="footer-section">
            <h4>Популярные категории</h4>
            <ul>
              <li><a href="#concerts">Концерты</a></li>
              <li><a href="#sports">Спорт</a></li>
              <li><a href="#theater">Театр</a></li>
              <li><a href="#cinema">Кинотеатр</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Поддержка</h4>
            <ul>
              <li><a href="#help">Помощь</a></li>
              <li><a href="#contact">Контакты</a></li>
              <li><a href="#privacy">Политика конфиденциальности</a></li>
              <li><a href="#terms">Условия использования</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Свяжитесь с нами</h4>
            <p>Email: support@eventtickets.ru</p>
            <p>Телефон: +7 (800) 555-35-35</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {currentYear} EventTickets. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
