import styles from "./MentorDashboard.module.css";
import search from "../assets/search.png";
import {jwtDecode} from "jwt-decode";
import { useEffect, useState } from "react";

function MentorDashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      setUser({
        name: decoded.name,
        photo: decoded.photo,
        role: decoded.userType,
      });
    } catch (err) {
      console.log("Failed to decode token");
    }
  }, []);

  const photo = user?.photo
    ? `http://localhost:11000/uploads/${user.photo}`
    : "/default.png";

  return (
    <>
      <div className={styles.searchDiv}>
        <div className={styles.searchArea}>
          <input type="text" placeholder="Search ..." />
          <img src={search} alt="search-icon" />
        </div>

        {user && (
          <div className={styles.userInfo}>
            <img src={photo} alt="User" className={styles.userPhoto} />
            <div className={styles.userText}>
              <p className={styles.userName}>{user.name}</p>
              <p className={styles.userRole}>{user.role}</p>
            </div>
          </div>
        )}
      </div>
      <div className={styles.jobsDiv}>
        <div>
          <h2>Assigned Jobs</h2>
        </div>
        <div>
          <div>
            <h2>Pending jobs</h2>
          </div>
          <div>
            <h2>Applications sent</h2>
          </div>
        </div>
      </div>
    </>
  );
}
export default MentorDashboard;
