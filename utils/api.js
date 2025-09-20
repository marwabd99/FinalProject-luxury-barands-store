// 📌 בסיס URL לשרת – כל הבקשות ילכו לכתובת הזו
export const BASE_URL = "http://localhost:5000/api";

// 📌 פונקציה כללית לשליחת בקשות לשרת עם תמיכה ב-token
export const fetchWithToken = async (url, options = {}) => {
  // מנסים להביא את ה-token שנשמר ב-localStorage אחרי שהמשתמש התחבר
  const token = localStorage.getItem("token");

  // יוצרים headers (כותרות HTTP) לבקשה
  const headers = {
    "Content-Type": "application/json", // ברירת מחדל: שולחים JSON
    ...(token && { Authorization: `Bearer ${token}` }),
    // אם יש token → מוסיפים אותו ל-headers תחת Authorization
    ...options.headers,
    // מאפשרים לדרוס/להוסיף headers נוספים מבחוץ (options)
  };

  // שולחים את הבקשה לשרת עם fetch
  const res = await fetch(`${BASE_URL}${url}`, { ...options, headers });

  // ממירים את התשובה של השרת ל-JSON
  const data = await res.json();

  // אם התשובה לא הצליחה (res.ok === false) → זורקים שגיאה
  if (!res.ok) throw new Error(data.message || "Server error");

  // מחזירים את הנתונים (data) לשימוש בקוד שקרא לפונקציה
  return data;
};
