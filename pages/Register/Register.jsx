import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  close_popup,
  login_popup,
} from "../../Redux/slices/loginRegisterSlice";
import "../../pages/Register/Register.css";

const Register = () => {
  const dispatch = useDispatch();

  // state של הטופס
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // סגירת הפופאפ
  const handleClose = () => {
    dispatch(close_popup());
  };

  // טיפול בשליחת הטופס
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("הסיסמאות לא תואמות!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) throw new Error(data.message || "שגיאה בהרשמה");

      alert("ההרשמה הצליחה! עכשיו התחבר/י.");
      dispatch(login_popup()); // פותח את הפופאפים של התחברות
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        {/* כפתור סגירה */}
        <button className="close-btn" onClick={handleClose}>
          &times;
        </button>

        <h2>הרשמה</h2>

        {/* טופס הרשמה */}
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
          <input
            type="password"
            placeholder="אימות סיסמה"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "טוען..." : "צור חשבון"}
          </button>
        </form>

        {/* הצגת שגיאה */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* מעבר לעמוד התחברות */}
        <p className="switch-auth">
          כבר רשום?{" "}
          <button onClick={() => dispatch(login_popup())} className="link">
            התחבר כאן
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
