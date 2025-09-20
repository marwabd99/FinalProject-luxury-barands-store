// src/components/ProductPage/ProductPage.jsx

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Redux/slices/cartSlice";
import { toast } from "react-toastify"; // ✅ Toast
import "react-toastify/dist/ReactToastify.css";
import "./ProductPage.css";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("שגיאה בטעינת מוצר:", err);
        toast.error("שגיאה בטעינת המוצר!");
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p>טוען...</p>;

const handleAddToCart = () => {
  dispatch(addToCart({ productId: product._id, quantity: 1 }));
  toast.success("פריט נוסף לעגלה 🛒", {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
};

  const isOutOfStock = product.stock === 0; // בדיקת מלאי

  return (
    <div className="product-page-container">
      <div className="product-page-card">
        <img
          src={`/${product.image}`}
          alt={product.name}
          className="page-image"
        />
        <div className="page-info">
          <h2>{product.name}</h2>
          <p className="description">{product.description}</p>
          <h3 className="price">{product.price} ₪</h3>

          <button
            onClick={handleAddToCart}
            className={`add-to-cart-btn ${isOutOfStock ? "disabled" : ""}`}
            disabled={isOutOfStock}
          >
            {isOutOfStock ? "אזל מהמלאי ❌" : "🛒 הוסף לעגלה"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
