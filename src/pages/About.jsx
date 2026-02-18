import './About.css';

const About = () => {
  const features = [
    {
      id: 1,
      title: 'Простота использования',
      description: 'Интуитивный интерфейс для быстрой регистрации и покупки билетов'
    },
    {
      id: 2,
      title: 'Безопасность',
      description: 'Защита ваших личных данных с использованием современных технологий'
    },
    {
      id: 3,
      title: 'Быстрота',
      description: 'Мгновенная покупка билетов в несколько кликов'
    },
    {
      id: 4,
      title: 'Поддержка',
      description: 'Служба поддержки для помощи пользователям'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Активных пользователей' },
    { number: '1000+', label: 'Мероприятий' },
    { number: '98%', label: 'Удовлетворённость' },
    { number: '24/7', label: 'Техподдержка' }
  ];

  const team = [
    { name: 'Иван Петров', role: 'Основатель' },
    { name: 'Мария Сидорова', role: 'Разработка' },
    { name: 'Сергей Иванов', role: 'Дизайн' },
    { name: 'Анна Соколова', role: 'Менеджер' }
  ];

  return (
    <div className="about-container">
      {/* Hero */}
      <section className="about-hero">
        <h1>О Comic Con</h1>
        <p>Платформа для поиска и покупки билетов на мероприятия</p>
      </section>

      {/* Mission */}
      <section className="about-section">
        <h2>Наша миссия</h2>
        <p>
          Comic Con создана для того, чтобы сделать процесс покупки билетов максимально удобным. 
          Мы помогаем людям найти и приобрести билеты на интересующие их мероприятия.
        </p>
      </section>

      {/* Features */}
      <section className="about-section">
        <h2>Преимущества</h2>
        <div className="features-list">
          {features.map(feature => (
            <div key={feature.id} className="feature-item">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="about-section">
        <h2>Статистика</h2>
        <div className="stats-list">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="about-section">
        <h2>Процесс</h2>
        <div className="steps-list">
          <div className="step-item">
            <div className="step-num">1</div>
            <h3>Регистрация</h3>
            <p>Создайте аккаунт</p>
          </div>
          <div className="step-item">
            <div className="step-num">2</div>
            <h3>Поиск</h3>
            <p>Найдите мероприятие</p>
          </div>
          <div className="step-item">
            <div className="step-num">3</div>
            <h3>Покупка</h3>
            <p>Оформите билет</p>
          </div>
          <div className="step-item">
            <div className="step-num">4</div>
            <h3>Получение</h3>
            <p>Посетите событие</p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="about-section">
        <h2>Команда</h2>
        <div className="team-list">
          {team.map((member, index) => (
            <div key={index} className="team-item">
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="about-section about-contact">
        <h2>Контакты</h2>
        <p>Email: info@comiccon.kz</p>
        <p>Телефон:</p>
        <p>Адрес: </p>
      </section>
    </div>
  );
};

export default About;
