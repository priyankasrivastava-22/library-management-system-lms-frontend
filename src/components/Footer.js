    import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Project Info */}
        <div className="footer-section">
          <h3>Library Management System</h3>
          <p>
            A digital platform to manage books, students, 
            borrowing records, and library operations efficiently.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>

          <ul>
            <li>Home</li>
            <li>Books</li>
            <li>Login</li>
            <li>Dashboard</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h4>Contact</h4>

          <p>Email: support@lms.com</p>
          <p>Phone: +91 XXXXX XXXXX</p>
          <p>Location: India</p>
        </div>

      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>© 2026 Library Management System | Developed by Priyanka Srivastava</p>
      </div>
    </footer>
  );
}

export default Footer;