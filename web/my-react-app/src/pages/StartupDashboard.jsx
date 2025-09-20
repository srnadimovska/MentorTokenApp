import styles from "./StartupDashboard.module.css";
import search from "../assets/search.png";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import axios from "axios";

function StartupDashboard() {
  const [user, setUser] = useState(null);
  const [apps, setApps] = useState([]);
  const [mentors, setMentors] = useState([]);
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

  useEffect(() => {
  const token = localStorage.getItem("token");

  axios.get("http://localhost:5000/api/v1/startup/applications", {
    headers: { Authorization: `Bearer ${token}` },
  }).then(res => setApps(res.data.data));

  axios.get("http://localhost:5000/api/v1/startup/top-mentors", {
    headers: { Authorization: `Bearer ${token}` },
  }).then(res => setMentors(res.data.data));
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
            </div>
          </div>
        )}
      </div>

      <div>
  <h2>Assigned Jobs</h2>
  {apps.map(app => (
    <div key={app._id} className="jobRow">
      <span>{app.jobId.title}</span>
      <span className={`status ${app.status.toLowerCase()}`}>
        {app.status.toUpperCase()}
      </span>
    </div>
  ))}
</div>


<div>
  <h2>Best Performing Mentors</h2>
  {mentors.map(m => (
    <div key={m._id} className="mentorRow">
      <img src={`http://localhost:5000/uploads/${m.photo}`} alt={m.name} />
      <span>{m.name}</span>
      <span>{m.achievedJobs} Achieved Jobs</span>
    </div>
  ))}
</div>
    </>
  );
}
export default StartupDashboard;
