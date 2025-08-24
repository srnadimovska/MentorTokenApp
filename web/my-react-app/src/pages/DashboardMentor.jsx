import styles from "./DashboardMentor.module.css";
import dashboard from "../assets/category.png";
import stats from "../assets/trello.png";
import jobs from "../assets/disc.png";
import logo from "../assets/Group 8626.svg";
import icon from "../assets/icon.png";
import logoutButton from "../assets/Logout.png";
import {Link, Outlet, useLocation} from "react-router-dom";


function Dashboard() {

  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <>
    <div className={styles.dashboard}>
        
      <div className={styles.leftContainer}>
        <div className={styles.leftContainerMenu}>
          <div className={styles.leftContainerLogo}>
            <img src={logo} alt="logo" className={styles.logoImg} />
            <span>
              <img src={icon} alt="icon"/>
            </span>
          </div>
          <Link to="/dashboardMentor">
          <p>
            <img src={dashboard} alt="dashboard" />
            <span>Dashboard</span>
          </p>
          </Link>
          <Link to="/dashboardMentor/mystats">
          <p>
            <img src={stats} alt="stats" />
            <span>My Stats</span>
          </p>
          </Link>
          <Link to="/dashboardMentor/jobsfeed">
          <p>
            <img src={jobs} alt="jobs" />
            <span>Job Feed</span>
          </p>
          </Link>
        </div>

        <div>
          <button onClick={handleLogout}>
            <img src={logoutButton} alt="logout" />
          </button>
        </div>
        </div>
      </div>

      <div className={styles.rightContainer}>
        <Outlet />
      </div>
    
    </>
  );
}
export default Dashboard;
