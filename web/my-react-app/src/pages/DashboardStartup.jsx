import logo from "../assets/Group 8626.svg";
import icon from "../assets/icon.png";
import dashboard from "../assets/category.png";
import mentor from "../assets/mentor.png";
import jobs from "../assets/disc.png";
import logoutButton from "../assets/Logout.png";
import { Link, Outlet, useNavigate } from "react-router-dom";
import styles from "./DashboardStartup.module.css";
function DashboardStartup(){
    const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
    return(
        <>
        <div className={styles.dashboard}>
        <div className={styles.leftContainer}>
          <div className={styles.leftContainerMenu}>
            <div className={styles.leftContainerLogo}>
              <img src={logo} alt="logo" className={styles.logoImg} />
              <span>
                <img src={icon} alt="icon" />
              </span>
            </div>
            <Link to="/dashboardStartup">
              <p>
                <img src={dashboard} alt="dashboard" />
                <span>Dashboard</span>
              </p>
            </Link>
            <Link to="/dashboardStartup/mymentors">
              <p>
                <img src={mentor} alt="mentor" />
                <span>Mentors</span>
              </p>
            </Link>
            <Link to="/dashboardStartup/jobs">
              <p>
                <img src={jobs} alt="jobs" />
                <span>Jobs</span>
              </p>
            </Link>

            <div className={styles.logoutBtnWrapper}>
              <button onClick={handleLogout}>
                <img src={logoutButton} alt="logout" />
              </button>
            </div>
          </div>
        </div>
      

      <div className={styles.rightContainer}>
        <Outlet />
      </div>
      </div>
    </>
    )
}
export default DashboardStartup