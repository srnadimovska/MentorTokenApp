import { Link } from "react-router-dom";
import logo from "../assets/Group 8626.svg";
import linkedin from "../assets/linkedin.png";
import twitter from "../assets/twitter.png";
import facebook from "../assets/facebook.png";
import styles from './Footer.module.css';
function Footer() {
  return (
    <div className={styles.footerSection}>
      <div className={styles.firstFooterSection}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
          <p>
            With Mentor Token, every failure transforms into an opportunity for growth.
          </p>
        </div>
        <div className={styles.pages}>
          <h2>Pages</h2>
          <div className={styles.links}>
          <Link to="/">Home</Link>
          <Link to="contact">Contact US</Link>
          </div>
        </div>
        <div className={styles.contact}>
          <h2>Contact</h2>
          <p>info@mentortoken.com</p>
          <p>+(389)123 456 789</p>
        </div>
        <div className={styles.socialMedia}>
          <h2>Follow us</h2>
          <div className={styles.logosFollow}>
            <a href="https://www.linkedin.com/learning/" target="_blank">
            <img src={linkedin} alt="linkedin" /></a>
            <a href="https://x.com/?lang=en" target="_blank">
            <img src={twitter} alt="twitter" /></a>
            <a href="https://www.facebook.com/" target="_blank">
            <img src={facebook} alt="facebook" /></a>
          </div>
        </div>
      </div>
      <div className={styles.line}></div>
      <div className={styles.rights}>
        <p>©2024 Mentor Token. All right reserved.</p>
      </div>
    </div>
  );
}
export default Footer;
