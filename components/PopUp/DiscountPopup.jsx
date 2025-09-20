import { useState } from "react";
import "./DiscountPopup.css";

const DiscountPopup = () => {
  const [show, setShow] = useState(true); 

  const handleClose = () => {
    setShow(false);
    localStorage.setItem("discountPopupClosed", "true"); 
  };

  if (!show) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content popup-gradient">
        <button className="popup-close" onClick={handleClose}>
          &times;
        </button>
        <h2>🎉 ברוכים הבאים!</h2>
        <p>קבלו 10% הנחה על הקנייה הראשונה שלכם!</p>
      </div>
    </div>
  );
};

export default DiscountPopup;
