import styles from "./DashboardMentor.module.css";
import dashboard from "../assets/category.png";
import stats from "../assets/trello.png";
import jobs from "../assets/disc.png";
import logo from "../assets/Group 8626.svg";
import icon from "../assets/icon.png";
import logoutButton from "../assets/Logout.png";
function Dashboard() {
  return (
    <>
    <div className={styles.dashboard}>
        
      <div className={styles.leftContainer}>
        <div className={styles.leftContainerMenu}>
          <div className={styles.leftContainerLogo}>
            <img src={logo} alt="logo" className={styles.logoImg} />
            <span>
              <img src={icon} />
            </span>
          </div>
          <p>
            <img src={dashboard} alt="dashboard" />
            <span>Dashboard</span>
          </p>
          <p>
            <img src={stats} alt="stats" />
            <span>My Stats</span>
          </p>
          <p>
            <img src={jobs} alt="jobs" />
            <span>Job Feed</span>
          </p>
        </div>
        <div>
          <button>
            <img src={logoutButton} alt="logout" />
          </button>
        </div>
        </div>
      </div>
    
    </>
  );
}
export default Dashboard;
