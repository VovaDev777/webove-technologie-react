import css from "./PortfolioPage.module.css";
import Footer from "../../components/Footer/Footer";

const PortfolioPage = () => {
  return (
    <>
      <section className={css.btnCon}>
        <ul className={css.btnList}>
          <li className={css.btnListItem}>
            <button className={css.filterBtn}>All</button>
          </li>
          <li className={css.btnListItem}>
            <button className={css.filterBtn}>Web Site</button>
          </li>
          <li className={css.btnListItem}>
            <button className={css.filterBtn}>App</button>
          </li>
          <li className={css.btnListItem}>
            <button className={css.filterBtn}>Design</button>
          </li>
          <li className={css.btnListItem}>
            <button className={css.filterBtn}>Marketing</button>
          </li>
        </ul>
      </section>
      <section className={css.cardsCon}>
        <ul className={css.cardsList}>
          <li className={css.cardsListItem}>
            <img
              className={css.cardsListItemImg}
              src="../../../public/images/portfolio1.jpg"
              alt=""
            />
            <h4 className={css.cardsListItemTitle}>
              Banking App Interface Concept
            </h4>
            <p className={css.cardsListItemDesc}>App</p>
          </li>
          <li className={css.cardsListItem}>
            <img
              className={css.cardsListItemImg}
              src="../../../public/images/portfolio2.jpg"
              alt=""
            />
            <h4 className={css.cardsListItemTitle}>Cashless Payment</h4>
            <p className={css.cardsListItemDesc}>Marketing</p>
          </li>
          <li className={css.cardsListItem}>
            <img
              className={css.cardsListItemImg}
              src="../../../public/images/portfolio3.jpg"
              alt=""
            />
            <h4 className={css.cardsListItemTitle}>Meditation App</h4>
            <p className={css.cardsListItemDesc}>App</p>
          </li>
          <li className={css.cardsListItem}>
            <img
              className={css.cardsListItemImg}
              src="../../../public/images/portfolio4.jpg"
              alt=""
            />
            <h4 className={css.cardsListItemTitle}>Taxi Service</h4>
            <p className={css.cardsListItemDesc}>Marketing</p>
          </li>
          <li className={css.cardsListItem}>
            <img
              className={css.cardsListItemImg}
              src="../../../public/images/portfolio5.jpg"
              alt=""
            />
            <h4 className={css.cardsListItemTitle}>Screen Illustrations</h4>
            <p className={css.cardsListItemDesc}>Design</p>
          </li>
          <li className={css.cardsListItem}>
            <img
              className={css.cardsListItemImg}
              src="../../../public/images/portfolio6.jpg"
              alt=""
            />
            <h4 className={css.cardsListItemTitle}>Online Courses</h4>
            <p className={css.cardsListItemDesc}>Marketing</p>
          </li>
          <li>
            <img
              className={css.cardsListItemImg}
              src="../../../public/images/portfolio7.jpg"
              alt=""
            />
            <h4 className={css.cardsListItemTitle}>
              Instagram Stories Concept
            </h4>
            <p className={css.cardsListItemDesc}>Design</p>
          </li>
          <li className={css.cardsListItem}>
            <img
              className={css.cardsListItemImg}
              src="../../../public/images/portfolio8.jpg"
              alt=""
            />
            <h4 className={css.cardsListItemTitle}>Organic Food</h4>
            <p className={css.cardsListItemDesc}>Web Site</p>
          </li>
          <li className={css.cardsListItem}>
            <img
              className={css.cardsListItemImg}
              src="../../../public/images/portfolio9.jpg"
              alt=""
            />
            <h4 className={css.cardsListItemTitle}>Fresh Coffee</h4>
            <p className={css.cardsListItemDesc}>Web Site</p>
          </li>
        </ul>
      </section>
      <Footer />
    </>
  );
};

export default PortfolioPage;
