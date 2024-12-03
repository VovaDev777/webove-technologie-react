import css from "./HomePage.module.css";

const HomePage = () => {
  return (
    <>
      <div className={css.hero}>
        <h1 className={css.heroText}>Effective Solutions for Your Business</h1>
        <button className={css.heroBtn}>Order Service</button>
      </div>
      <section className={css.skillsCon}>
        <ul className={css.skillsList}>
          <li className={css.skillsListItem}>
            <h3 className={css.skillsTitle}>Strategy</h3>
            <p className={css.skillsText}>
              Our goal is to identify the business problem to walk away with the
              perfect and creative solution.{" "}
            </p>
          </li>
          <li className={css.skillsListItem}>
            <h3 className={css.skillsTitle}>Punctuality</h3>
            <p className={css.skillsText}>
              Bring the key message to the brand's audience for the best price
              within the shortest possible time.
            </p>
          </li>
          <li className={css.skillsListItem}>
            <h3 className={css.skillsTitle}>Diligence</h3>
            <p className={css.skillsText}>
              Research and confirm brands that present the strongest digital
              growth opportunities and minimize risk.
            </p>
          </li>
          <li className={css.skillsListItem}>
            <h3 className={css.skillsTitle}>Technologies</h3>
            <p className={css.skillsText}>
              Design practice focused on digital experiences. We bring forth a
              deep passion for problem-solving.
            </p>
          </li>
        </ul>
      </section>
      <section className={css.doingCon}>
        <h2 className={css.doingTitle}>What are we doing</h2>
        <ul className={css.doingList}>
          <li className={css.doingItem}>
            <img className={css.doingImg} src="" alt="" />
          </li>
          <li className={css.doingItem}>
            <img className={css.doingImg} src="" alt="" />
          </li>
          <li className={css.doingItem}>
            <img className={css.doingImg} src="" alt="" />
          </li>
        </ul>
      </section>
    </>
  );
};

export default HomePage;
