import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import "./Sale.css";

const Sale = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/products/sale?page=${page}&limit=${limit}`
        );
        const data = await res.json();

        const uniqueProducts = Array.from(
          new Map((data.products || []).map((p) => [p._id, p])).values()
        );

        setProducts(uniqueProducts);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, [page]);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="sale-container">
      <h2 className="blue-title">🔥 SALE Collection</h2>

      <div className="products-grid">
        {products.map((product) => (
          <Link
            key={product._id}
            to={`/product/${product._id}`}
            className="product-card-link"
          >
            <div className="product-card">
              <div className="product-image-wrapper">
                <img
                  src={`/${product.image}`}
                  alt={product.name}
                  className="product-image"
                />
                {product.stock === 0 && (
                  <span className="sold-out-badge">SOLD OUT</span>
                )}
                <span className="sale-badge">SALE</span>
              </div>

              <h3>{product.name}</h3>
              <p>מחיר: {product.price} ₪</p>
              <button>View Details</button>
            </div>
          </Link>
        ))}
      </div>

      <div className="pagination">
        <button onClick={handlePrev} disabled={page === 1} className="page-btn">
          <MdArrowForwardIos size={24} />
        </button>
        <span className="page-number">
          {page} / {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className="page-btn"
        >
          <MdArrowBackIos size={24} />
        </button>
      </div>
    </div>
  );
};

export default Sale;
