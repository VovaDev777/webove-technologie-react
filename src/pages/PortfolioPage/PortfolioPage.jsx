import { useState } from "react";
import css from "./PortfolioPage.module.css";
import Footer from "../../components/Footer/Footer";

const PortfolioPage = () => {
  // State for filtering
  const [filter, setFilter] = useState("All");

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  // Portfolio items data
  const portfolioItems = [
    { id: 1, title: "Banking App Interface Concept", category: "App", imgSrc: "../../../public/images/portfolio1.jpg", detail: "This is a concept design for a modern banking app." },
    { id: 2, title: "Cashless Payment", category: "Marketing", imgSrc: "../../../public/images/portfolio2.jpg", detail: "A marketing campaign focused on cashless transactions." },
    { id: 3, title: "Meditation App", category: "App", imgSrc: "../../../public/images/portfolio3.jpg", detail: "A user-friendly meditation app design for daily relaxation." },
    { id: 4, title: "Taxi Service", category: "Marketing", imgSrc: "../../../public/images/portfolio4.jpg", detail: "A taxi service marketing strategy with a fresh approach." },
    { id: 5, title: "Screen Illustrations", category: "Design", imgSrc: "../../../public/images/portfolio5.jpg", detail: "A collection of modern screen illustrations for apps." },
    { id: 6, title: "Online Courses", category: "Marketing", imgSrc: "../../../public/images/portfolio6.jpg", detail: "Marketing strategies for online course platforms." },
    { id: 7, title: "Instagram Stories Concept", category: "Design", imgSrc: "../../../public/images/portfolio7.jpg", detail: "Creative concept for Instagram stories." },
    { id: 8, title: "Organic Food", category: "Web Site", imgSrc: "../../../public/images/portfolio8.jpg", detail: "Website design for an organic food company." },
    { id: 9, title: "Fresh Coffee", category: "Web Site", imgSrc: "../../../public/images/portfolio9.jpg", detail: "Website promoting a fresh coffee brand." },
  ];

  // Handle filter change
  const handleFilterChange = (category) => {
    setFilter(category);
  };

  // Open modal with specific content
  const openModal = (item) => {
    setModalContent(item);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  // Filtered items
  const filteredItems = filter === "All" ? portfolioItems : portfolioItems.filter(item => item.category === filter);

  return (
    <>
      <section className={css.btnCon}>
        <ul className={css.btnList}>
          {["All", "Web Site", "App", "Design", "Marketing"].map((category) => (
            <li className={css.btnListItem} key={category}>
              <button className={css.filterBtn} onClick={() => handleFilterChange(category)}>
                {category}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className={css.cardsCon}>
        <ul className={css.cardsList}>
          {filteredItems.map((item) => (
            <li className={css.cardsListItem} key={item.id} onClick={() => openModal(item)}>
              <img className={css.cardsListItemImg} src={item.imgSrc} alt={item.title} />
              <h4 className={css.cardsListItemTitle}>{item.title}</h4>
              <p className={css.cardsListItemDesc}>{item.category}</p>
            </li>
          ))}
        </ul>
      </section>

      {isModalOpen && (
  <div className={`${css.modalOverlay} show`} onClick={closeModal}>
    <div className={`${css.modalContent} show`} onClick={(e) => e.stopPropagation()}>
      <button className={css.modalCloseBtn} onClick={closeModal}>×</button>
      <img className={css.modalImg} src={modalContent.imgSrc} alt={modalContent.title} />
      <h4 className={css.modalTitle}>{modalContent.title}</h4>
      <p className={css.modalDetail}>{modalContent.detail}</p>
    </div>
  </div>
)}


      <Footer />
    </>
  );
};

export default PortfolioPage;
