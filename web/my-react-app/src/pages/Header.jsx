import { Link } from 'react-router-dom';
import logo from '../assets/Group 8626.svg';
import arrow from '../assets/arrow-right.png';
import styles from './Header.module.css';
function Header() {
  return (
    <nav className={styles.navbarContainer}>
      <div>
        <img src={logo} alt="logo" />
      </div>
      <div className={styles.links}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <div className={styles.buttonContainer}>
        <p>Login</p>
        <Link to="/login">
          <button><img src={arrow} alt="arrow" /><span>Get started</span></button>
        </Link>
      </div>
    </nav>
  );
}

export default Header;
