import { useDispatch, useSelector } from "react-redux"; // חיבור ל-Redux
import { useNavigate } from "react-router-dom"; // ניווט אחרי התנתקות
import { logoutUser } from "../../Redux/slices/usersSlice"; // פעולה אסינכרונית ל-Logout
import "./LogoutButton.css";  

const LogoutButton = () => {
  const dispatch = useDispatch(); // שולח פעולות ל-Redux
  const navigate = useNavigate(); // נשתמש אחרי התנתקות לניווט

  // נבדוק אם המשתמש מחובר כרגע
  const { userInfo } = useSelector((state) => state.users);

  // לוגיקה בעת לחיצה על כפתור התנתקות
  const handleLogout = () => {
    dispatch(logoutUser()); // מוחק מה-Redux וגם מה-localStorage
    navigate("/"); // מחזיר לדף הבית
  };

  // אם המשתמש לא מחובר → לא מציגים כפתור Logout
  if (!userInfo) return null;

  return (
    <button onClick={handleLogout} className="logout-btn">
      התנתק
    </button>
  );
};

export default LogoutButton;
