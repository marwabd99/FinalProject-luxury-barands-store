import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Redux/slices/usersSlice";
import {
  close_popup,
  register_popup,
} from "../../Redux/slices/loginRegisterSlice";
import "../../pages/Login/Login.css";

const Login = () => {
  const dispatch = useDispatch();

  // state של הטופס
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // state של Redux
  const { loading, error } = useSelector((state) => state.users);

  // פונקציה לסגירת הפופאפ
  const handleClose = () => {
    dispatch(close_popup());
  };

  // טיפול בשליחת הטופס
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        {/* כפתור סגירה */}
        <button className="close-button" onClick={handleClose}>
          &times;
        </button>

        {/* כותרת */}
        <h2>התחברות</h2>

        {/* טופס התחברות */}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="אימייל"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="סיסמה"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "טוען..." : "התחבר"}
          </button>
        </form>

        {/* הצגת שגיאה */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* מעבר לעמוד הרשמה */}
        <p className="switch-auth">
          עדיין לא נרשמת?{" "}
          <button onClick={() => dispatch(register_popup())} className="link">
            הירשם עכשיו
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
