import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMyOrders } from "../../../Redux/slices/ordersSlice";
import "./InvoicePage.css";

const InvoicePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);
  const { userInfo } = useSelector((state) => state.users); // משתמש מחובר
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (!orders || orders.length === 0) dispatch(fetchMyOrders());
  }, [dispatch, orders]);

  useEffect(() => {
    if (orders && orders.length > 0) {
      const found = orders.find((o) => o._id === id);
      setOrder(found || null);
    }
  }, [orders, id]);

  if (loading) return <p>טוען הזמנה...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!order) return <p>הזמנה לא נמצאה.</p>;

  // קבלת אימייל לפי סוג התשלום או מהמשתמש המחובר
  const email =
    order.paymentMethod === "paypal"
      ? order.paypalEmail
      : userInfo?.email || "לא סופק";

  return (
    <div className="invoice-container">
      <h2>חשבונית הזמנה #{order._id}</h2>

      <div className="invoice-section">
        <h3>סטטוס ההזמנה:</h3>
        <p>{order.status}</p>
      </div>

      <div className="invoice-section">
        <h3>פרטי המשלוח:</h3>
        <p>
          {order.shippingAddress.street}, {order.shippingAddress.city}
        </p>
        <p>
          {order.shippingAddress.postalCode}, {order.shippingAddress.country}
        </p>
        <p>טלפון: {order.shippingAddress.phone || "לא סופק"}</p>
        <p>אימייל: {email}</p>
      </div>

      <div className="invoice-section">
        <h3>מוצרים:</h3>
        <table className="invoice-table">
          <thead>
            <tr>
              <th>מוצר</th>
              <th>מחיר יחידה</th>
              <th>כמות</th>
              <th>סה"כ</th>
            </tr>
          </thead>
          <tbody>
            {order.products.map((item, index) => (
              <tr key={index}>
                <td>{item.product?.name || "מוצר נמחק"}</td>
                <td>{item.product?.price?.toFixed(2) || 0} ₪</td>
                <td>{item.quantity}</td>
                <td>
                  {((item.product?.price || 0) * item.quantity).toFixed(2)} ₪
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="invoice-section total">
        <h3>סך הכל לתשלום: {order.totalPrice.toFixed(2)} ₪</h3>
      </div>
    </div>
  );
};

export default InvoicePage;
