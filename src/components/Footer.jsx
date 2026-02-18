const Footer = () => {
  return (
    <footer style={{
      background: 'white',
      borderTop: '2px solid #333',
      textAlign: 'center',
      padding: '20px',
      marginTop: 'auto',
      fontSize: '14px',
      color: '#666'
    }}>
      <p>&copy; 2026 Comic Con. Все права защищены.</p>
      <p style={{ fontSize: '12px', opacity: 0.8 }}>
        Email: info@comiccon.kz
      </p>
    </footer>
  );
};

export default Footer;