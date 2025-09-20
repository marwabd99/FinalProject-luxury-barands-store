import { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/slices/usersSlice";
import Login from "../../pages/Login/Login.jsx";
import Register from "../../pages/Register/Register.jsx";
import "./Navbar.css";
import {
  close_popup,
  login_popup,
} from "../../Redux/slices/loginRegisterSlice.js";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.users?.userInfo);
  const { login_open, register_open } = useSelector(
    (state) => state.loginRegister
  );

  // Ref על כל התפריט (לוגו + המבורגר + קישורים)
  const menuRef = useRef(null);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setMenuOpen(false);
  };

  // סגירת תפריט אם לוחצים מחוץ לו
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // רשימת הקטגוריות לייצור אוטומטי של הקישורים
  const categories = [
    { path: "/women", label: "women" },
    { path: "/men", label: "men" },
    { path: "/kids", label: "kids" },
    { path: "/sale", label: "SALE" },
  ];

  return (
    <>
      <nav className="navbar">
        <div className="navbar-right" ref={menuRef}>
          {/* לוגו */}
          <div className="navbar-logo">
            <Link to="/" onClick={() => setMenuOpen(false)}>
              LUXURY BRANDS
            </Link>
          </div>

          {/* המבורגר */}
          <div
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          {/* קישורים */}
          <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
            {categories.map((cat) => (
              <li
                key={cat.path}
                className={location.pathname === cat.path ? "active" : ""}
              >
                <Link
                  to={cat.path}
                  onClick={() => setMenuOpen(false)} // סוגר תפריט בעת ניווט
                >
                  {cat.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* צד שמאל: התחברות / התנתקות + עגלה */}
        <div className="navbar-left">
          {user ? (
            <button className="auth-link logout-btn" onClick={handleLogout}>
              התנתק
            </button>
          ) : (
            <button
              className="auth-link"
              onClick={() => {
                setAuthOpen(true);
                dispatch(login_popup());
              }}
            >
              <FaUser size={20} />
            </button>
          )}

          <Link
            to="/cart"
            className={`auth-link cart-link ${
              location.pathname === "/cart" ? "active" : ""
            }`}
          >
            <FaShoppingCart size={20} />
          </Link>
        </div>
      </nav>

      {/* חלוניות התחברות/הרשמה */}
      {authOpen && !user && register_open && (
        <div className="auth-sidebar">
          <div className="auth-content">
            <button
              className="close-btn"
              onClick={() => dispatch(close_popup())}
            >
              ✖
            </button>
            <Register />
          </div>
        </div>
      )}

      {authOpen && !user && login_open && (
        <div className="auth-sidebar">
          <div className="auth-content">
            <button
              className="close-btn"
              onClick={() => dispatch(close_popup())}
            >
              ✖
            </button>
            <Login />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
