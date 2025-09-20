import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyOrders } from "../../../Redux/slices/ordersSlice";
import "./Orders.css";

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  if (loading) return <p>Loading your orders...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="orders-container">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <h3>Order #{order._id}</h3>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(order.orderDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              <p>
                <strong>Total:</strong> ${order.totalPrice}
              </p>

              <div className="order-products">
                {order.products.map((item, index) => (
                  <div key={index} className="order-product">
                    <p>{item.product?.name || "Deleted product"}</p>
                    <p>Qty: {item.quantity}</p>
                  </div>
                ))}
              </div>

              <div className="shipping-info">
                <h4>Shipping Address</h4>
                <p>
                  {order.shippingAddress.street}, {order.shippingAddress.city}
                </p>
                <p>
                  {order.shippingAddress.postalCode},{" "}
                  {order.shippingAddress.country}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
