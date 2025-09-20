// src/components/Cart/Cart.jsx
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // ייבוא useNavigate

// פעולות מה-slice של העגלה
import {
  getCart,
  removeFromCart,
  changeQuantity,
  clearCartServer, // מנקה גם בשרת וגם ב-Redux
} from "../../Redux/slices/cartSlice";

import "./Cart.css";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // יצירת hook לניווט

  // =====================
  // שליפת פרטי העגלה מה-Redux
  // =====================
  const { items, loading, error } = useSelector((state) => state.cart);

  // =====================
  // שליפת העגלה מהשרת בעת טעינת הקומפוננטה
  // =====================
  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  // =====================
  // שינוי כמות של מוצר
  // =====================
  const handleQuantityChange = (id, e) => {
    const quantity = parseInt(e.target.value);
    if (quantity >= 1) {
      dispatch(changeQuantity({ productId: id, quantity }));
    }
  };

  // =====================
  // חישוב סכום כולל בשקלים
  // =====================
  const totalAmount = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  // =====================
  // ניווט לדף Checkout
  // =====================
  const handleCheckout = () => {
    if (items.length === 0) {
      alert("העגלה שלך ריקה!");
      return;
    }
    navigate("/checkout"); // מעבר לדף CheckoutPage
  };

  if (loading) return <p>טוען...</p>;
  if (error) return <p>שגיאה: {error}</p>;

  return (
    <div className="cart-container">
      <h2>🛒 העגלה שלי</h2>

      {items.length === 0 ? (
        <p className="empty-cart">העגלה שלך ריקה.</p>
      ) : (
        <>
          <div className="cart-items">
            {items.map((item) => (
              <div key={item.product._id} className="cart-item">
                <img src={`/${item.product.image}`} alt={item.product.name} />
                <div className="item-info">
                  <h3>{item.product.name}</h3>
                  <p>מחיר: {item.product.price} ₪</p>

                  <div className="quantity">
                    <label>כמות :</label>
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) =>
                        handleQuantityChange(item.product._id, e)
                      }
                    />
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => dispatch(removeFromCart(item.product._id))}
                  >
                    ❌ הסר
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>סך הכל: {totalAmount.toFixed(2)} ₪</h3>

            <div className="cart-actions">
              <button
                className="clear-btn"
                onClick={() => dispatch(clearCartServer())}
              >
                🧹 ניקוי עגלה
              </button>

              {/* כפתור Checkout עם ניווט */}
              <button className="checkout-btn" onClick={handleCheckout}>
                💳 לתשלום
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
