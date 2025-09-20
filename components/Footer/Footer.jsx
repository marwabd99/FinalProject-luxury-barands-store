import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      {/* עוטף את כל תוכן הפוטר – מאפשר שליטה על פריסה בעיצוב */}
      <div className="footer-container">
        {/* קישורים פנימיים בתוך האתר */}
        <div className="footer-links">
          <Link to="/contact" className="footer-link">
            צור קשר {/* טקסט שיוצג למשתמש */}
          </Link>
          <Link to="/AboutUs" className="footer-link">
            מי אנחנו
          </Link>
        </div>
        <div className="footer-about">
          <h2>LUXURY BRANDS</h2>
          <p>
            החנות שלנו מציעה את המותגים היוקרתיים ביותר עם שירות אישי ומקצועי.
          </p>
        </div>

        {/* אייקונים של רשתות חברתיות (קישורים חיצוניים) */}
        <div className="footer-social">
          {/* אינסטגרם */}
          <a
            href="https://instagram.com" // קישור חיצוני
            target="_blank" // פותח בלשונית חדשה
            rel="noreferrer" // הגנה על פרטיות
            aria-label="Instagram" // נגישות – תיאור לקריינות
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg"
              alt="Instagram" // תיאור חלופי לתמונה
              className="footer-img-icon" // מאפשר עיצוב מותאם
            />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
              alt="Facebook"
              className="footer-img-icon"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
