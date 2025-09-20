import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createOrder, fetchMyOrders } from "../../../Redux/slices/ordersSlice";
import { clearCartServer } from "../../../Redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { FaCreditCard, FaPaypal, FaMoneyBillWave } from "react-icons/fa";
import "./CheckoutPage.css";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);

  const [shippingAddress, setShippingAddress] = useState({
    street: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("credit_card");

  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    holder: "",
  });

  const [paypalEmail, setPaypalEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const totalPrice = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (items.length === 0) {
      setError("העגלה ריקה.");
      return;
    }

    // בדיקות לפי אמצעי תשלום
    if (paymentMethod === "credit_card") {
      const { cardNumber, expiry, cvv, holder } = cardInfo;
      if (!cardNumber || !expiry || !cvv || !holder) {
        setError("אנא מלא את כל פרטי הכרטיס.");
        return;
      }
    }

    if (paymentMethod === "paypal" && !paypalEmail) {
      setError("אנא הזן את אימייל ה-PayPal.");
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        products: items.map((i) => ({
          product: i.product._id,
          quantity: i.quantity,
        })),
        shippingAddress,
        totalPrice,
        paymentMethod,
        ...(paymentMethod === "credit_card" && { cardInfo }),
        ...(paymentMethod === "paypal" && { paypalEmail }),
      };

      const newOrder = await dispatch(createOrder(orderData)).unwrap();

      if (!newOrder || !newOrder._id)
        throw new Error("הזמנה נכשלה – אין מזהה הזמנה.");

      dispatch(clearCartServer());
      dispatch(fetchMyOrders());

      navigate(`/invoice/${newOrder._id}`);
    } catch (err) {
      setError(err.message || "שגיאה ביצירת ההזמנה");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <h2>פרטי משלוח ואמצעי תשלום</h2>
      {error && <p className="error">{error}</p>}

      <form className="checkout-form" onSubmit={handleSubmit}>
        {/* פרטי משלוח */}
        <label>רחוב:</label>
        <input
          name="street"
          value={shippingAddress.street}
          onChange={handleChange}
          required
        />
        <label>עיר:</label>
        <input
          name="city"
          value={shippingAddress.city}
          onChange={handleChange}
          required
        />
        <label>מיקוד:</label>
        <input
          name="postalCode"
          value={shippingAddress.postalCode}
          onChange={handleChange}
          required
        />
        <label>מדינה:</label>
        <input
          name="country"
          value={shippingAddress.country}
          onChange={handleChange}
          required
        />

        {/* אמצעי תשלום */}
        <div className="payment-section">
          <h3>בחר אמצעי תשלום:</h3>
          <div className="payment-options">
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="credit_card"
                checked={paymentMethod === "credit_card"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <FaCreditCard /> כרטיס אשראי
            </label>

            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={paymentMethod === "paypal"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <FaPaypal /> PayPal
            </label>

            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <FaMoneyBillWave /> מזומן
            </label>
          </div>

          {/* שדות כרטיס אשראי */}
          {paymentMethod === "credit_card" && (
            <div className="card-info">
              <input
                type="text"
                name="cardNumber"
                placeholder="מספר כרטיס"
                value={cardInfo.cardNumber}
                onChange={handleCardChange}
                required
              />
              <input
                type="text"
                name="expiry"
                placeholder="תוקף (MM/YY)"
                value={cardInfo.expiry}
                onChange={handleCardChange}
                required
              />
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={cardInfo.cvv}
                onChange={handleCardChange}
                required
              />
              <input
                type="text"
                name="holder"
                placeholder="שם בעל הכרטיס"
                value={cardInfo.holder}
                onChange={handleCardChange}
                required
              />
            </div>
          )}

          {/* שדות PayPal */}
          {paymentMethod === "paypal" && (
            <div className="paypal-info">
              <input
                type="email"
                placeholder="אימייל PayPal"
                value={paypalEmail}
                onChange={(e) => setPaypalEmail(e.target.value)}
                required
              />
            </div>
          )}
        </div>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? "שולח..." : `שלח הזמנה (${totalPrice.toFixed(2)} ₪)`}
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
