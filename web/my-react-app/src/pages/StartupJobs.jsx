import styles from "./StartupJobs.module.css";
import search from "../assets/search.png";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import axios from "axios";

function JobsStartup() {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      console.log("Decoded user in StartupDashboard:", decoded);
      setUser({
        name: decoded.name,
        photo: decoded.photo,
        // role: decoded.userType,
        id: decoded.id,
      });
    } catch (err) {
      console.log("Failed to decode token");
      setError("Invalid token");
      setLoading(false);
    }
  }, [token]);

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
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default JobsStartup;
