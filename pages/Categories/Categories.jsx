// ייבוא קובץ עיצוב לקטגוריות
import "./Categories.css";

const Categories = () => {
  // רשימת הקטגוריות שנרצה להציג
  const categories = [
    {
      id: 1,
      title: "נשים",
      image: "/images/women.jpg",
      link: "/women", // לינק לדף נשים
    },
    {
      id: 2,
      title: "גברים",
      image: "/images/men.jpg",
      link: "/men", // לינק לדף גברים
    },
    {
      id: 3,
      title: "ילדים",
      image: "/images/kids.jpg",
      link: "/kids", // לינק לדף ילדים
    },
    {
      id: 4,
      title: "SALE",
      image: "/images/sale.jpg",
      link: "/sale", // לינק לדף סייל
      fullWidth: true, // סימון שזה באנר לרוחב מלא
    },
  ];

  return (
    <div className="categories-wrapper">
      {/* הצגת הקטגוריות הרגילות (נשים, גברים, ילדים) */}
      <div className="categories-container">
        {categories
          .filter((cat) => !cat.fullWidth) // ניקח רק קטגוריות שאינן באנר
          .map((cat) => (
            <a href={cat.link} key={cat.id} className="category-card">
              {/* תמונה של הקטגוריה */}
              <img src={cat.image} alt={cat.title} className="category-image" />
              {/* טקסט וכפתור SHOP NOW */}
              <div className="category-text">
                <h2>{cat.title}</h2>
                <button className="shop-btn">SHOP NOW</button>
              </div>
            </a>
          ))}
      </div>

      {/* הצגת קטגוריות שמסומנות כ-banners (במקרה הזה SALE) */}
      {categories
        .filter((cat) => cat.fullWidth) // ניקח רק באנרים
        .map((cat) => (
          <a href={cat.link} key={cat.id} className="category-banner">
            {/* תמונה של הבאנר */}
            <img src={cat.image} alt={cat.title} className="banner-image" />
            {/* טקסט וכפתור SHOP NOW מעל הבאנר */}
            <div className="banner-text">
              <h2>{cat.title}</h2>
              <button className="shop-btn">SHOP NOW</button>
            </div>
          </a>
        ))}
    </div>
  );
};

export default Categories;
