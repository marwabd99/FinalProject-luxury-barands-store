import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./BestSellers.css";

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // לנווט לקטגוריות

  useEffect(() => {
    fetch("http://localhost:5000/api/products/bestsellers")
      .then((res) => {
        if (!res.ok) throw new Error("שגיאה בטעינת המוצרים מהשרת");
        return res.json();
      })
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("שגיאה בשליפת מוצרים:", err);
        setError("לא ניתן לטעון מוצרים כרגע");
        setLoading(false);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  const handleCardClick = (category) => {
    if (category) {
      navigate(`/${category.toLowerCase()}`); 
    } else {
      console.warn("לא קיימת קטגוריה למוצר זה");
    }
  };

  if (loading) return <p className="loading-message">טוען מוצרים...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!products.length)
    return <p className="no-products">אין מוצרים להציג כרגע</p>;

  return (
    <div className="bestsellers-container">
      <h2 className="bestsellers-title">המוצרים הנמכרים ביותר</h2>
      <Slider {...settings}>
        {products.map((item) => (
          <div key={item._id} className="bestsellers-card-wrapper">
            <div
              className="bestsellers-card"
              onClick={() => handleCardClick(item.category)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={`/${item.image || "placeholder.jpg"}`}
                alt={item.name}
                className="bestsellers-image"
                onError={(e) => {
                  e.target.src = "/images/placeholder.jpg";
                }}
              />
              <h3 className="bestsellers-name">{item.name}</h3>
              <p className="bestsellers-price">{item.price}₪</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BestSellers;
