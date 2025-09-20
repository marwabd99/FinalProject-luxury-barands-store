import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "./Redux/slices/cartSlice.js";

// Slick-carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import AccessibilityWidget from "./components/AccessibilityWidget/AccessibilityWidget.jsx";
import DiscountPopup from "./components/PopUp/DiscountPopup.jsx";

// Pages
import Home from "./pages/Home/Home.jsx";
import Women from "./pages/Women/Women.jsx";
import Men from "./pages/Men/Men.jsx";
import Kids from "./pages/Kids/Kids.jsx";
import Sale from "./pages/Sale/Sale.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Register from "./pages/Register/Register.jsx";
import AboutUs from "./pages/AboutUs/AboutUs.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import ProductPage from "./pages/ProductPage/ProductPage.jsx";
import CheckoutPage from "./pages/Cart/CheckoutPage/CheckoutPage.jsx";
import InvoicePage from "./pages/Cart/InvoicePage/InvoicePage.jsx";
import Orders from "./pages/Cart/Orders/Orders.jsx";

function App() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const userInfo = useSelector((state) => state.users.userInfo); // האם המשתמש מחובר

  const addToCartHandler = (product) => {
    dispatch(addToCart(product));
    // הפופאפ של Toast כבר מופעל בתוך ProductPage
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const updateQuantity = (id, quantity) => {
    console.log("Update quantity not implemented in Redux yet", id, quantity);
  };

  return (
    <div>
      <Navbar cartItems={cartItems} />

      {/* Popup למשתמשים לא מחוברים */}
      {!userInfo && <DiscountPopup />}

      <Routes>
        <Route path="/" element={<Home addToCart={addToCartHandler} />} />
        <Route path="/women" element={<Women addToCart={addToCartHandler} />} />
        <Route path="/men" element={<Men addToCart={addToCartHandler} />} />
        <Route path="/kids" element={<Kids addToCart={addToCartHandler} />} />
        <Route path="/sale" element={<Sale addToCart={addToCartHandler} />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/invoice/:id" element={<InvoicePage />} />
        <Route path="/orders" element={<Orders />} />
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCartHandler}
            />
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/product/:id"
          element={<ProductPage addToCart={addToCartHandler} />}
        />
      </Routes>

      <Footer />
      <AccessibilityWidget />

      {/* ToastContainer גלובלי לכל האתר */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
