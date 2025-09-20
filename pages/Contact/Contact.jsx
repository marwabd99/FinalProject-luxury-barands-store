import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      {/* כותרת ראשית */}
      <h1 className="contact-title">נשמח לשמוע ממך!</h1>

      <p>
        אם יש לך שאלות, בקשות או כל דבר שתרצה לשתף אותנו, נשמח לקבל את פנייתך.
        הצוות שלנו זמין לעזור ולהעניק לך מענה מקצועי ומהיר.
      </p>

      <p>
        טלפון: 0528380265
        <br />
        אימייל: info@LuxuryBrands.com
        <br />
        כתובת: רחוב אלגלמה, עראבה 
      </p>

      <p>מלא את הטופס למטה ונחזור אליך בהקדם האפשרי.</p>

      {/* טופס יצירת קשר */}
      <form
        action="mailto:info@dumuslux.com" // כתובת המייל שאליה יישלח הטופס
        method="POST" // שיטת שליחת הטופס
        encType="text/plain" // סוג ההצפנה של תוכן הטופס
        className="contact-form" // מחלקת CSS לעיצוב הטופס
      >
        {/* שדה קלט לשם מלא */}
        <label>
          שם מלא:
          <br />
          <input type="text" name="name" required />
          {/* required מוודא שהשדה לא יהיה ריק */}
        </label>

        {/* שדה קלט לאימייל */}
        <label>
          אימייל:
          <br />
          <input type="email" name="email" required />
          {/* input type=email מבצע בדיקה בסיסית של פורמט אימייל */}
        </label>

        {/* שדה טקסט רחב להודעה */}
        <label>
          הודעה:
          <br />
          <textarea name="message" rows="5" required></textarea>
          {/* textarea לשדה טקסט רב שורות */}
        </label>

        {/* כפתור לשליחת הטופס */}
        <button type="submit">שלח</button>
      </form>
    </div>
  );
};

export default Contact;
