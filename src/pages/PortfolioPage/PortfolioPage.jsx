import { useState } from "react";
import css from "./PortfolioPage.module.css";
import Footer from "../../components/Footer/Footer";

const PortfolioPage = () => {
  
  const [filter, setFilter] = useState("All");

  
  const portfolioItems = [
    { id: 1, title: "Banking App Interface Concept", category: "App", imgSrc: "../../../public/images/portfolio1.jpg" },
    { id: 2, title: "Cashless Payment", category: "Marketing", imgSrc: "../../../public/images/portfolio2.jpg" },
    { id: 3, title: "Meditation App", category: "App", imgSrc: "../../../public/images/portfolio3.jpg" },
    { id: 4, title: "Taxi Service", category: "Marketing", imgSrc: "../../../public/images/portfolio4.jpg" },
    { id: 5, title: "Screen Illustrations", category: "Design", imgSrc: "../../../public/images/portfolio5.jpg" },
    { id: 6, title: "Online Courses", category: "Marketing", imgSrc: "../../../public/images/portfolio6.jpg" },
    { id: 7, title: "Instagram Stories Concept", category: "Design", imgSrc: "../../../public/images/portfolio7.jpg" },
    { id: 8, title: "Organic Food", category: "Web Site", imgSrc: "../../../public/images/portfolio8.jpg" },
    { id: 9, title: "Fresh Coffee", category: "Web Site", imgSrc: "../../../public/images/portfolio9.jpg" },
  ];

  
  const handleFilterChange = (category) => {
    setFilter(category);
  };

  
  const filteredItems = filter === "All" ? portfolioItems : portfolioItems.filter(item => item.category === filter);

  return (
    <>
      <section className={css.btnCon}>
        <ul className={css.btnList}>
          {["All", "Web Site", "App", "Design", "Marketing"].map((category) => (
            <li className={css.btnListItem} key={category}>
              <button 
                className={css.filterBtn} 
                onClick={() => handleFilterChange(category)}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className={css.cardsCon}>
        <ul className={css.cardsList}>
          {filteredItems.map(({ id, title, category, imgSrc }) => (
            <li className={css.cardsListItem} key={id}>
              <img className={css.cardsListItemImg} src={imgSrc} alt={title} />
              <h4 className={css.cardsListItemTitle}>{title}</h4>
              <p className={css.cardsListItemDesc}>{category}</p>
            </li>
          ))}
        </ul>
      </section>

      <Footer />
    </>
  );
};

export default PortfolioPage;
