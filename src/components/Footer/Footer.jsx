import { NavLink } from "react-router-dom";
import css from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={css.footerCon}>
      <div className={css.footerLogoCon}>
        <NavLink to="/" className={css.logoLink}>
          <p className={css.logo}>
            <span className={css.firstLogoWord}>WEB</span>STUDIO
          </p>
        </NavLink>
        <p className={css.footerText}>
          Increase the flow of customers and sales for your business with
          digital marketing & growth solutions.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
